const express           = require('express')
const cors              = require('cors')
const {port}            = require('./config')
const APIHandlerAPIList = require('./api/APIHandlerAPIList')
const APIHandlerPokedex = require('./api/APIHandlerPokedex')
const APIHandlerTypes   = require('./api/APIHandlerTypes')
const cachePokedex      = require('./middlewares/cachePokedex')
const cacheTypes      = require('./middlewares/cacheTypes')
const ensureDataIsReady = require('./utils/ensureDataIsReady')
const logger            = require('log4js').getLogger('Server')

const app = express()

app.use(cors())

logger.trace('Start')

ensureDataIsReady()
  .then(() => {
    app.get('/', APIHandlerAPIList)
    app.get('/pokedex', cachePokedex, APIHandlerPokedex)
    app.get('/types', cacheTypes, APIHandlerTypes)

    app.listen(
      port,
      () => {
        logger.trace(`Pokedex is lock and loaded. Listening on port ${port}`)
      })
  })
  .catch(err => {
    logger.error('Fail, pokedex data was not loaded correcty', err)
  })
