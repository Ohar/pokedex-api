const express               = require('express')
const {port}                = require('./config')
const APIHandlerAPIList     = require('./api/APIHandlerAPIList')
const APIHandlerPokemonList = require('./api/APIHandlerPokemonList')
const cachePokemonList      = require('./middlewares/cachePokemonList')
const logger                = require('log4js').getLogger('Server')

const app = express()

logger.trace('Start')

app.get('/', APIHandlerAPIList)
app.get('/pokemon', cachePokemonList, APIHandlerPokemonList)

app.listen(
  port,
  () => {
    logger.trace(`Listening on port ${port}`)
  })
