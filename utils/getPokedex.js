const redisClient        = require('../services/redisClient')
const loadFreshPokedex   = require('../utils/loadFreshPokedex')
const CACHE_NAME_POKEDEX = require('../const/CACHE_NAME_POKEDEX')
const logger             = require('log4js').getLogger('getPokedex')
const argv               = require('minimist')(process.argv.slice(2))

const forceUpdate = Boolean(argv.forceupdate)

function getPokedex () {
  logger.trace('Start, forceUpdate: ', forceUpdate)

  return new Promise(resolve => {
    redisClient.get(CACHE_NAME_POKEDEX, (cacheErr, data) => {
      if (!forceUpdate && data && !cacheErr) {
        logger.trace('There is some cached data')

        try {
          const parsed = JSON.parse(data)

          resolve(Promise.resolve(parsed))
          logger.trace(`Done. Data had got from cache`)
        } catch (parseErr) {
          resolve(loadFreshPokedex())
          logger.error(`Fail. Data hadn't been got from cache:`, parseErr)
        }
      } else {
        logger.trace('There is no cached data')

        if (cacheErr) {
          logger.error('Fail. Cache error:', cacheErr)
        }

        resolve(loadFreshPokedex())
      }
    })
  })
}

module.exports = getPokedex
