const POKEAPI_URL         = require('../const/POKEAPI_URL')
const CACHE_NAME_SERVICES = require('../const/CACHE_NAME_SERVICES')
const getDataByURL        = require('../utils/getDataByURL')
const storeToCache        = require('../cache/storeToCache')
const logger              = require('log4js').getLogger('APIHandlerPokemonList')

function APIHandlerPokemonList (req, res) {
  logger.trace('Start')

  getDataByURL(POKEAPI_URL)
    .then(data => JSON.parse(data))
    .then(storeToCache(CACHE_NAME_SERVICES))
    .then(data => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.send(data)
      logger.trace('Done', data.length)
    })
    .catch(err => {
      logger.error('Fail: ', err)
      res.status(500)
      res.send('Error')
    })
}

module.exports = APIHandlerPokemonList
