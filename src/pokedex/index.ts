import { eq } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

import cache from "../cache";
import db from "../db";
import { pokemon } from "../db/schema";
import { buildPokemon } from "./pokemon";

export type Pokemon = ReturnType<typeof buildPokemon>;
type MaybePokemon = Pokemon | undefined;
type Query = string | number;

const cachePokemon = async (query: Query, cb: () => Promise<MaybePokemon>) => {
  if (cache.has(query)) {
    return cache.get(query) as MaybePokemon;
  }

  const pokemon = (await cb()) ?? undefined;
  cache.set(query, pokemon);

  return pokemon;
};

const findPokemonBy = async (col: PgColumn, query: Query) =>
  cachePokemon(query, async () => {
    const pokemonResult = await db.query.pokemon.findFirst({
      where: eq(col, query),
      with: {
        abilities: true,
        baseStats: true,
        evolutions: true,
        measurements: true,
      },
    });

    return buildPokemon(pokemonResult);
  });

const getPokemonById = async (id: number) => findPokemonBy(pokemon.id, id);

const getPokemonByName = async (name: string) =>
  findPokemonBy(pokemon.name, name);

export default { getPokemonById, getPokemonByName };
