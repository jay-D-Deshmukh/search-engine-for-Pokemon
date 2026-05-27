import type { PokemonStat } from "../types/pokemon";
import { toDisplayName } from "../utils/formatters";

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const PokemonStats = ({ stats }: PokemonStatsProps) => {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.name} className="stat-item">
          <div className="stat-header">
            <span>{toDisplayName(stat.name)}</span>
            <span>{stat.value}</span>
          </div>
          <div className="stat-track">
            <div
              className="stat-fill"
              style={{ width: `${Math.min(stat.value, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonStats;
