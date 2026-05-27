const axios = require("axios");
const pokemonCache = require("../cache/pokemonCache");
const formatPokemon = require("../utils/formatPokemon");
const HttpError = require("../utils/httpError");

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const getPokemonByName = async (name) => {
  const sanitizedName = name?.trim().toLowerCase();

  if (!sanitizedName) {
    throw new HttpError(400, "Pokemon name is required");
  }

  const cachedPokemon = pokemonCache.get(sanitizedName);
  if (cachedPokemon) {
    return {
      data: cachedPokemon,
      fromCache: true,
    };
  }

  try {
    const response = await axios.get(`${POKE_API_BASE_URL}/${sanitizedName}`);
    const formattedPokemon = formatPokemon(response.data);
    pokemonCache.set(sanitizedName, formattedPokemon);

    return {
      data: formattedPokemon,
      fromCache: false,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new HttpError(404, "Pokemon not found");
    }

    throw new HttpError(502, "Failed to fetch Pokemon from upstream API");
  }
};

module.exports = {
  getPokemonByName,
};
