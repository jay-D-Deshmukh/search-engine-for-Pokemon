const { getPokemonByName } = require("../services/pokemonService");

const getPokemon = async (req, res, next) => {
  try {
    const { name } = req.params;
    const result = await getPokemonByName(name);

    res.status(200).json({
      success: true,
      source: result.fromCache ? "cache" : "api",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPokemon,
};
