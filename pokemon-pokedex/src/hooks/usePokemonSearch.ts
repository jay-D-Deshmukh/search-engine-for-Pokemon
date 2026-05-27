import { useState } from "react";
import axios from "axios";
import { fetchPokemonByName } from "../services/pokemonApi";
import type { Pokemon } from "../types/pokemon";

const DEFAULT_ERROR_MESSAGE =
  "Unable to load Pokemon right now. Please try again.";

export const usePokemonSearch = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPokemon = async (name: string) => {
    const sanitizedName = name.trim();

    if (!sanitizedName) {
      setError("Please enter a Pokemon name.");
      setPokemon(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPokemonByName(sanitizedName);
      setPokemon(data);
    } catch (err) {
      setPokemon(null);

      if (axios.isAxiosError(err)) {
        const message =
          (err.response?.data as { message?: string } | undefined)?.message ??
          DEFAULT_ERROR_MESSAGE;
        setError(message);
      } else {
        setError(DEFAULT_ERROR_MESSAGE);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pokemon,
    isLoading,
    error,
    searchPokemon,
  };
};
