import { eq } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

import db from "../db";
import { pokemon } from "../db/schema";
import { buildPokemon } from "./pokemon";

const findPokemonBy = async (col: PgColumn, query: string | number) => {
  const pokemonResult = await db.query.pokemon.findFirst({
    where: eq(col, query),
    with: {
      abilities: true,
      baseStats: true,
      evolutions: true,
      measurements: true,
    },
  });

  return pokemonResult ? buildPokemon(pokemonResult) : null;
};

const getPokemonById = async (id: number) => findPokemonBy(pokemon.id, id);

const getPokemonByName = async (name: string) =>
  findPokemonBy(pokemon.name, name);

export default { getPokemonById, getPokemonByName };
