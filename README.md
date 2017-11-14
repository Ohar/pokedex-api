# API server for [Pokedex client](https://github.com/Ohar/pokedex)

## Install

1. Install Node.js 8.6.0+
2. Install Redis
3. `yarn install`
4. create `config.json` [as described](#configjson-example)

```bash
node index.js
```

## Usage

### Common usage

```bash
npm start
```

### If you need to update cached data and start after

```bash
npm forceupdate
```

## `config.json` example

```json
{
  "port": 4242
}
```
