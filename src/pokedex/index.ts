import { eq } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

import { cacheResult } from "../cache";
import db from "../db";
import { pokemon } from "../db/schema";
import { buildPokemon } from "./pokemon";

export type Pokemon = ReturnType<typeof buildPokemon>;
type MaybePokemon = Pokemon | undefined;
type CompValue = string | number;

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

export default {
  getPokemonById: (id: number) => findPokemonBy(pokemon.id, id),
  getPokemonByName: (name: string) => findPokemonBy(pokemon.name, name),
};
