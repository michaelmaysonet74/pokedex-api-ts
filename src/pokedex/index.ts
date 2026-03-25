import { eq } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

import db from "../db";
import { pokemon } from "../db/schema";

import type { EvolutionChain } from "./evolution";
import { normalizeEvolutionChain } from "./evolution";

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

  return pokemonResult
    ? {
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
        abilities: pokemonResult.abilities.map((ability) => ({
          name: ability.name,
          effect: ability.effect,
          isHidden: ability.isHidden,
        })),
        baseStats: pokemonResult.baseStats
          ? {
              hp: pokemonResult.baseStats.hp,
              attack: pokemonResult.baseStats.attack,
              defense: pokemonResult.baseStats.defense,
              specialAttack: pokemonResult.baseStats.specialAttack,
              specialDefense: pokemonResult.baseStats.specialDefense,
              speed: pokemonResult.baseStats.speed,
            }
          : null,
        evolution: normalizeEvolutionChain(
          pokemonResult.evolutions as EvolutionChain,
        ),
        measurement: pokemonResult.measurements
          ? {
              height: pokemonResult.measurements.height,
              weight: pokemonResult.measurements.weight,
            }
          : null,
      }
    : null;
};

const getPokemonById = async (id: number) => findPokemonBy(pokemon.id, id);

const getPokemonByName = async (name: string) =>
  findPokemonBy(pokemon.name, name);

export default { getPokemonById, getPokemonByName };
