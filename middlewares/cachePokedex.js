const redisClient        = require('./../services/redisClient')
const CACHE_NAME_POKEDEX = require('./../const/CACHE_NAME_POKEDEX')
const getFromCache       = require('../cache/getFromCache')
const logger             = require('log4js').getLogger('cachePokedex')

function cachePokedex (req, res, next) {
  logger.trace('Start')

  redisClient.get(CACHE_NAME_POKEDEX, getFromCache(res, next))
}

module.exports = cachePokedex
