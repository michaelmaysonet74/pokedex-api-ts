import { PokemonRecord } from "../db/schema";
import { buildAbility } from "./abilities";
import { buildBaseStats } from "./baseStats";
import { buildEvolution } from "./evolution";
import { buildMeasurement } from "./measurement";

const parsePokemonId = (id: string | number) =>
  typeof id === "number" ? id : parseInt(id);

export const buildPokemon = (pokemonResult?: PokemonRecord | null) =>
  pokemonResult
    ? {
        id: parsePokemonId(pokemonResult.id),
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
        baseStats: buildBaseStats(pokemonResult.baseStats),
        evolution: buildEvolution(pokemonResult.evolutions),
        measurement: buildMeasurement(pokemonResult.measurements),
      }
    : null;
