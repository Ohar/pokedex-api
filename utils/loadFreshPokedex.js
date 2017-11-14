const getPokemonList     = require('../utils/getPokemonList')
const getPokemonParams   = require('../utils/getPokemonParams')
const CACHE_NAME_POKEDEX = require('../const/CACHE_NAME_POKEDEX')
const storeToCache       = require('../cache/storeToCache')
const logger             = require('log4js').getLogger('loadFreshPokedex')
const {successLogger}    = require('log4js-middleware')

function loadFreshPokedex () {
  logger.trace('Start')

  return getPokemonList()
    .then(getPokemonParams)
    .then(storeToCache(CACHE_NAME_POKEDEX))
    .then(successLogger(logger))
}

module.exports = loadFreshPokedex
