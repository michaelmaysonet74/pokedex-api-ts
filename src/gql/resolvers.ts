import pokedex from "../pokedex";

const resolvers = {
  Query: {
    pokemonById: (_: unknown, { id }: { id: number }) =>
      pokedex.getPokemonById(id),

    pokemonByName: (_: unknown, { name }: { name: string }) =>
      pokedex.getPokemonByName(name),
  },
};

export default resolvers;
