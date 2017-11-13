const redis  = require('redis'),
      logger = require('log4js').getLogger('redisClient')

const redisClient = redis.createClient()

redisClient.on(
  'error',
  err => {
    logger.error('Redis error:', err)
  },
)

module.exports = redisClient
