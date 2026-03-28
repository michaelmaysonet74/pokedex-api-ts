import { PokemonRecord } from "../db/schema";
import { buildAbility } from "./abilities";
import { buildBaseStats } from "./baseStats";
import { buildEvolution } from "./evolution";
import { buildMeasurement } from "./measurement";

export const buildPokemon = (pokemonResult: PokemonRecord) => ({
  id: pokemonResult.id,
  name: pokemonResult.name,
  category: pokemonResult.category,
  entry: pokemonResult.entry,
  generation: pokemonResult.generation,
  sprite: pokemonResult.sprite,
  types: pokemonResult.types,
  immunities: pokemonResult.immunities,
  resistances: pokemonResult.resistances,
  weaknesses: pokemonResult.weaknesses,
  abilities: pokemonResult.abilities?.map(buildAbility) ?? [],
  baseStats: pokemonResult.baseStats
    ? buildBaseStats(pokemonResult.baseStats)
    : null,
  evolution: pokemonResult.evolutions
    ? buildEvolution(pokemonResult.evolutions)
    : null,
  measurement: pokemonResult.measurements
    ? buildMeasurement(pokemonResult.measurements)
    : null,
});
