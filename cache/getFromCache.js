const logger = require('log4js').getLogger('getFromCache')

function getFromCache (res, next) {
  return (cacheErr, data) => {
    logger.trace('Start')

    if (data && !cacheErr) {
      logger.trace('There is some cached data')

      try {
        const parsed = JSON.parse(data)

        res.send(parsed)
        logger.trace(`Done. Data had got to cache`)
      } catch (parseErr) {
        logger.error(`Fail. Data hadn't been got to cache:`, parseErr)
        next()
      }
    } else {
      logger.trace('There is no cached data')

      if (cacheErr) {
        logger.error('Fail. Cache error:', cacheErr)
      }

      next()
    }
  }
}

module.exports = getFromCache
