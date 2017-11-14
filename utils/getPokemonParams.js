const logger                       = require('log4js').getLogger('getPokemonParams')
const {errorLogger, successLogger} = require('log4js-middleware')
const foreachTimeout               = require('foreach-timeout')
const getDataByURL                 = require('../utils/getDataByURL')

function getPokemonParams (pokemonList) {
  logger.trace('Start')

  const WAIT_INTERVAL_MS = 0

  return foreachTimeout(
    pokemonList,
    pokemon => getDataByURL(pokemon.url)
      .then(data => JSON.parse(data))
      .then(data => {
        delete data.moves
        delete data.game_indices
        delete data.location_area_encounters
        delete pokemon.url

        pokemon.params = data

        return pokemon
      }),
    WAIT_INTERVAL_MS,
  )
    .then(successLogger(logger))
    .catch(errorLogger(logger))
}

module.exports = getPokemonParams
