const tryToLoadFromCache = require('./tryToLoadFromCache')
const loadFreshPokedex   = require('./loadFresh/loadFreshPokedex')
const loadFreshTypes     = require('./loadFresh/loadFreshTypes')
const CACHE_NAME_POKEDEX = require('./../const/CACHE_NAME_POKEDEX')
const CACHE_NAME_TYPES   = require('./../const/CACHE_NAME_TYPES')
const foreachTimeout     = require('foreach-timeout')
const logger             = require('log4js').getLogger('ensureDataIsReady')

function ensureDataIsReady () {
  logger.trace('Start')

  return foreachTimeout(
    [
      {
        cacheName  : CACHE_NAME_POKEDEX,
        loadFreshCb: loadFreshPokedex,
      },
      {
        cacheName  : CACHE_NAME_TYPES,
        loadFreshCb: loadFreshTypes,
      },
    ],
    ({cacheName, loadFreshCb}) => tryToLoadFromCache(cacheName, loadFreshCb))
}

module.exports = ensureDataIsReady
