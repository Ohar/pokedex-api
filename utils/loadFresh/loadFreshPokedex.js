const loadFreshDataFromPokeapi = require('../loadFreshDataFromPokeapi')
const getPokemonParams         = require('../getPokemonParams')
const filterPokemonList        = require('../filterPokemonList')
const CACHE_NAME_POKEDEX       = require('../../const/CACHE_NAME_POKEDEX')
const POKEAPI_URL              = require('../../const/POKEAPI_URL')
const storeToCache             = require('../../cache/storeToCache')
const logger                   = require('log4js').getLogger('loadFreshPokedex')
const {successLogger}          = require('log4js-middleware')

function loadFreshPokedex () {
  logger.trace('Start')

  return loadFreshDataFromPokeapi(`${POKEAPI_URL}/pokemon`)
    .then(getPokemonParams)
    .then(filterPokemonList)
    .then(storeToCache(CACHE_NAME_POKEDEX))
    .then(successLogger(logger))
}

module.exports = loadFreshPokedex
