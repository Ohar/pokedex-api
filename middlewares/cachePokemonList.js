const redisClient             = require('./../services/redisClient')
const CACHE_NAME_POKEMON_LIST = require('./../const/CACHE_NAME_POKEMON_LIST')
const getFromCache            = require('../cache/getFromCache')
const logger                  = require('log4js').getLogger('cachePokemonList')

function cachePokemonList (req, res, next) {
  logger.trace('Start')

  redisClient.get(CACHE_NAME_POKEMON_LIST, getFromCache(res, next))
}

module.exports = cachePokemonList
