export interface PokemonStat {
  name: string;
  value: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string | null;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  stats: PokemonStat[];
}

export interface PokemonApiResponse {
  success: boolean;
  source: "cache" | "api";
  data: Pokemon;
}
