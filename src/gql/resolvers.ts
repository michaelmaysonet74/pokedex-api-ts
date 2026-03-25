import pokedex from "../pokedex";

const resolvers = {
  Query: {
    pokemonById: async (_: unknown, { id }: { id: number }) =>
      pokedex.getPokemonById(id),

    pokemonByName: async (_: unknown, { name }: { name: string }) =>
      pokedex.getPokemonByName(name),
  },
};

export default resolvers;
