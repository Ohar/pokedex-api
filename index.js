const express           = require('express'),
      {port}            = require('./config'),
      APIHandlerAPIList = require('./api/APIHandlerAPIList'),
      logger            = require('log4js').getLogger('Server')

const app = express()

logger.trace('Start')

app.get('/', APIHandlerAPIList)

app.listen(
  port,
  () => {
    logger.trace(`Listening on port ${port}`)
  })
