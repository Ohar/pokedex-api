const APIList = require('./../const/APIList'),
      logger  = require('log4js').getLogger('APIHandlerAPIList')

function APIHandlerAPIList (req, res) {
  logger.trace('APIList - request')

  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.send(APIList)
}

module.exports = APIHandlerAPIList
