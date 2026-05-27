const NodeCache = require("node-cache");

const pokemonCache = new NodeCache({
  stdTTL: 600,
  checkperiod: 120,
  maxKeys: 100,
  useClones: false,
});

module.exports = pokemonCache;
