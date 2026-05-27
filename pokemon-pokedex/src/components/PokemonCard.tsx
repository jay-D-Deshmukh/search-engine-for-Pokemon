import { motion } from "framer-motion";
import type { Pokemon } from "../types/pokemon";
import PokemonStats from "./PokemonStats";
import { formatHeight, formatWeight, toDisplayName } from "../utils/formatters";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <motion.article
      className="pokemon-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="pokemon-card-header">
        <img
          src={pokemon.image ?? "https://placehold.co/300x300?text=No+Image"}
          alt={pokemon.name}
          className="pokemon-image"
        />
        <div>
          <p className="pokemon-id">#{pokemon.id}</p>
          <h2>{toDisplayName(pokemon.name)}</h2>
        </div>
      </div>

      <div className="meta-grid">
        <div className="meta-item">
          <span className="meta-label">Height</span>
          <span>{formatHeight(pokemon.height)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Weight</span>
          <span>{formatWeight(pokemon.weight)}</span>
        </div>
      </div>

      <div className="meta-section">
        <h3>Types</h3>
        <div className="tag-list">
          {pokemon.types.map((type) => (
            <span key={type} className="tag">
              {toDisplayName(type)}
            </span>
          ))}
        </div>
      </div>

      <div className="meta-section">
        <h3>Abilities</h3>
        <div className="tag-list">
          {pokemon.abilities.map((ability) => (
            <span key={ability} className="tag ability-tag">
              {toDisplayName(ability)}
            </span>
          ))}
        </div>
      </div>

      <div className="meta-section">
        <h3>Stats</h3>
        <PokemonStats stats={pokemon.stats} />
      </div>
    </motion.article>
  );
};

export default PokemonCard;
