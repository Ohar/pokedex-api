const logger                       = require('log4js').getLogger('getPokemonList')
const {errorLogger, successLogger} = require('log4js-middleware')
const POKEAPI_URL                  = require('../const/POKEAPI_URL')
const getDataByURL                 = require('../utils/getDataByURL')

function getPokemonList (URL = `${POKEAPI_URL}/pokemon`) {
  logger.trace('Start')

  return getDataByURL(URL)
    .then(data => JSON.parse(data))
    .then(
      ({next, results}) => next
        ? getPokemonList(next)
                             .then(nextPokemons => results.concat(nextPokemons))
        : results,
    )
    .then(successLogger(logger))
    .catch(errorLogger(logger))
}

module.exports = getPokemonList
