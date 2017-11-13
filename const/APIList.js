const APIList = {
  APIList: [
    {
      endPoint   : '/',
      description: 'Get list of available APIs',
    },
    {
      endPoint   : '/pokemon',
      description: 'Get all pokemons',
    },
    {
      endPoint   : '/pokemon/{pokemonId}',
      description: 'Get specific pokemon',
    },
  ],
}

module.exports = APIList
