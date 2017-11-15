const loadFreshTypes = require('../utils/loadFresh/loadFreshTypes')
const logger         = require('log4js').getLogger('APIHandlerTypes')

function APIHandlerTypes (req, res) {
  logger.trace('Start')

  loadFreshTypes()
    .then(data => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.send(data)

      logger.trace('Done')
    })
    .catch(err => {
      logger.error('Fail: ', err)
      res.status(500)
      res.send('Error')
    })
}

module.exports = APIHandlerTypes
