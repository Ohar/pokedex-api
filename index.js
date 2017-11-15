const express           = require('express')
const cors              = require('cors')
const {port}            = require('./config')
const APIHandlerAPIList = require('./api/APIHandlerAPIList')
const APIHandlerPokedex = require('./api/APIHandlerPokedex')
const cachePokedex      = require('./middlewares/cachePokedex')
const getPokedex        = require('./utils/getPokedex')
const logger            = require('log4js').getLogger('Server')

const app = express()

app.use(cors())

logger.trace('Start')

getPokedex()
  .then(() => {
    app.get('/', APIHandlerAPIList)
    app.get('/pokedex', cachePokedex, APIHandlerPokedex)

    app.listen(
      port,
      () => {
        logger.trace(`Pokedex is lock and loaded. Listening on port ${port}`)
      })
  })
  .catch(err => {
    logger.error('Fail, pokedex data was not loaded correcty', err)
  })
