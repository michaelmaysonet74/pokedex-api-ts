import { eq } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

import { cacheResult } from "../cache";
import db from "../db";
import { pokemon } from "../db/schema";
import { buildPokemon } from "./pokemon";

export type Pokemon = ReturnType<typeof buildPokemon>;
type MaybePokemon = Pokemon | undefined;
type CompValue = string | number;
type ListFilters = { limit?: number; offset?: number };

const findPokemonBy = async (col: PgColumn, val: CompValue) =>
  cacheResult<CompValue, MaybePokemon>(val, async () => {
    const pokemonResult = await db.query.pokemon.findFirst({
      where: eq(col, val),
      with: {
        abilities: true,
        baseStats: true,
        evolutions: true,
        measurements: true,
      },
    });

    return buildPokemon(pokemonResult);
  });

const listPokemonBy = async (col: PgColumn, val: CompValue) =>
  cacheResult(`${col.name}${val}`, async () => {
    const pokemonResults = await db.query.pokemon.findMany({
      where: eq(col, val),
      with: {
        abilities: true,
        baseStats: true,
        evolutions: true,
        measurements: true,
      },
      orderBy: (pokemon) => [pokemon.id],
    });

    return pokemonResults.map(buildPokemon).filter(Boolean) as Pokemon[];
  });

const listAllPokemon = async (filters?: ListFilters): Promise<Pokemon[]> => {
  const all = await db.query.pokemon.findMany({
    limit: filters?.limit,
    offset: filters?.offset,
    with: {
      abilities: true,
      baseStats: true,
      evolutions: true,
      measurements: true,
    },
    orderBy: (pokemon) => [pokemon.id],
  });

  return all.map(buildPokemon).filter(Boolean) as Pokemon[];
};

export default {
  getPokemonById: (id: number) => findPokemonBy(pokemon.id, id),
  getPokemonByName: (name: string) => findPokemonBy(pokemon.name, name),
  listPokemonByGeneration: (generation: number) =>
    listPokemonBy(pokemon.generation, generation),
  listPokemon: (filters?: ListFilters) => listAllPokemon(filters),
};
