const loadFreshDataFromPokeapi = require('../loadFreshDataFromPokeapi')
const formatLoadedTypes        = require('../formatLoadedTypes')
const CACHE_NAME_TYPES         = require('../../const/CACHE_NAME_TYPES')
const POKEAPI_URL              = require('../../const/POKEAPI_URL')
const storeToCache             = require('../../cache/storeToCache')
const logger                   = require('log4js').getLogger('loadFreshTypes')
const {successLogger}          = require('log4js-middleware')

function loadFreshTypes () {
  logger.trace('Start')

  return loadFreshDataFromPokeapi(`${POKEAPI_URL}/type`)
    .then(formatLoadedTypes)
    .then(storeToCache(CACHE_NAME_TYPES))
    .then(successLogger(logger))
}

module.exports = loadFreshTypes
