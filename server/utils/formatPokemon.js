const formatPokemon = (pokemonData) => ({
  id: pokemonData.id,
  name: pokemonData.name,
  image:
    pokemonData.sprites.other["official-artwork"].front_default ||
    pokemonData.sprites.front_default,
  height: pokemonData.height,
  weight: pokemonData.weight,
  types: pokemonData.types.map((entry) => entry.type.name),
  abilities: pokemonData.abilities.map((entry) => entry.ability.name),
  stats: pokemonData.stats.map((entry) => ({
    name: entry.stat.name,
    value: entry.base_stat,
  })),
});

module.exports = formatPokemon;
