const logger                       = require('log4js').getLogger('loadFreshDataFromPokeapi')
const {errorLogger, successLogger} = require('log4js-middleware')
const getDataByURL                 = require('./getDataByURL')
const waitAndRetry                 = require('./waitAndRetry')

function loadFreshDataFromPokeapi (URL) {
  logger.trace('Start', URL)

  return getDataByURL(URL)
    .then(data => JSON.parse(data))
    .then(
      ({next, results}) => next
        ? loadFreshDataFromPokeapi(next)
                             .catch(err => { // Ignore broken API parts
                               logger.error(`Fail, can't get %s because of:`, URL, err)

                               return waitAndRetry(loadFreshDataFromPokeapi, [next])
                             })
                             .then(nextData => results.concat(nextData))
        : results,
    )
    .then(successLogger(logger))
    .catch(errorLogger(logger))
}

module.exports = loadFreshDataFromPokeapi
