const redisClient = require('../services/redisClient')
const logger      = require('log4js').getLogger('storeToCache')

function storeToCache (cacheName) {
  return data => {
    logger.trace('Start')

    try {
      redisClient.set(cacheName, JSON.stringify(data))
      logger.trace(`Done. Data “${cacheName}” had stored to cache`)
    } catch (err) {
      logger.error(`Fail. Data “${cacheName}” hadn't been stored to cache:`, err)
    }

    return data
  }
}

module.exports = storeToCache
