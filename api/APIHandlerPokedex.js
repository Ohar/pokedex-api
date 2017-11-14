const getPokedex = require('../utils/getPokedex')
const logger     = require('log4js').getLogger('APIHandlerPokedex')

function APIHandlerPokedex (req, res) {
  logger.trace('Start')

  getPokedex()
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

module.exports = APIHandlerPokedex
