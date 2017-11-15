const redisClient      = require('./../services/redisClient')
const CACHE_NAME_TYPES = require('./../const/CACHE_NAME_TYPES')
const getFromCache     = require('../cache/getFromCache')
const logger           = require('log4js').getLogger('cacheTypes')

function cacheTypes (req, res, next) {
  logger.trace('Start')

  redisClient.get(CACHE_NAME_TYPES, getFromCache(res, next))
}

module.exports = cacheTypes
