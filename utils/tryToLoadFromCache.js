const redisClient = require('../services/redisClient')
const logger      = require('log4js').getLogger('tryToLoadFromCache')
const argv        = require('minimist')(process.argv.slice(2))

const forceUpdate = Boolean(argv.forceupdate)

function tryToLoadFromCache (cacheName, loadFreshCb) {
  logger.trace('Start, forceUpdate: ', forceUpdate)

  return new Promise(resolve => {
    redisClient.get(cacheName, (cacheErr, data) => {
      if (!forceUpdate && data && !cacheErr) {
        logger.trace(`There is some cached “${cacheName}” data`)

        try {
          const parsed = JSON.parse(data)

          resolve(Promise.resolve(parsed))
          logger.trace(`Done. Data “${cacheName}” had got from cache`)
        } catch (parseErr) {
          resolve(loadFreshCb())
          logger.error(`Fail when parse “${cacheName}” data:`, parseErr)
        }
      } else {
        logger.trace(`There is no cached “${cacheName}” data `)

        if (cacheErr) {
          logger.error(`Fail when load “${cacheName}” data from cache:`, cacheErr)
        }

        resolve(loadFreshCb())
      }
    })
  })
}

module.exports = tryToLoadFromCache
