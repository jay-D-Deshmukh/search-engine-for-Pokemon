import axios from "axios";
import type { Pokemon, PokemonApiResponse } from "../types/pokemon";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

export const fetchPokemonByName = async (name: string) => {
  const response = await apiClient.get<PokemonApiResponse>(
    `/pokemon/${encodeURIComponent(name.trim().toLowerCase())}`
  );

  return normalizePokemonResponse(response.data.data);
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const normalizePokemonResponse = (payload: unknown): Pokemon => {
  if (!isRecord(payload)) {
    throw new Error("Invalid Pokemon response payload");
  }

  const image =
    typeof payload.image === "string"
      ? payload.image
      : getRawImageFromPayload(payload);

  const types = Array.isArray(payload.types)
    ? payload.types
        .map((entry) => {
          if (typeof entry === "string") return entry;
          if (
            isRecord(entry) &&
            isRecord(entry.type) &&
            typeof entry.type.name === "string"
          ) {
            return entry.type.name;
          }
          return null;
        })
        .filter((value): value is string => value !== null)
    : [];

  const abilities = Array.isArray(payload.abilities)
    ? payload.abilities
        .map((entry) => {
          if (typeof entry === "string") return entry;
          if (
            isRecord(entry) &&
            isRecord(entry.ability) &&
            typeof entry.ability.name === "string"
          ) {
            return entry.ability.name;
          }
          return null;
        })
        .filter((value): value is string => value !== null)
    : [];

  const stats = Array.isArray(payload.stats)
    ? payload.stats
        .map((entry) => {
          if (!isRecord(entry)) return null;

          if (typeof entry.name === "string" && typeof entry.value === "number") {
            return { name: entry.name, value: entry.value };
          }

          if (
            isRecord(entry.stat) &&
            typeof entry.stat.name === "string" &&
            typeof entry.base_stat === "number"
          ) {
            return { name: entry.stat.name, value: entry.base_stat };
          }

          return null;
        })
        .filter((value): value is Pokemon["stats"][number] => value !== null)
    : [];

  return {
    id: typeof payload.id === "number" ? payload.id : 0,
    name: typeof payload.name === "string" ? payload.name : "unknown",
    image,
    height: typeof payload.height === "number" ? payload.height : 0,
    weight: typeof payload.weight === "number" ? payload.weight : 0,
    types,
    abilities,
    stats,
  };
};

const getRawImageFromPayload = (payload: Record<string, unknown>) => {
  if (!isRecord(payload.sprites)) return null;

  const officialArtwork = isRecord(payload.sprites.other)
    ? payload.sprites.other["official-artwork"]
    : null;

  if (isRecord(officialArtwork) && typeof officialArtwork.front_default === "string") {
    return officialArtwork.front_default;
  }

  return typeof payload.sprites.front_default === "string"
    ? payload.sprites.front_default
    : null;
};
