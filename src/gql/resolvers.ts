import pokedex from "../pokedex";

const resolvers = {
  Query: {
    pokemonById: (_: unknown, { id }: { id: number }) =>
      pokedex.getPokemonById(id),

    pokemonByName: (_: unknown, { name }: { name: string }) =>
      pokedex.getPokemonByName(name),

    pokemonByGeneration: (_: unknown, { generation }: { generation: number }) =>
      pokedex.listPokemonByGeneration(generation),

    listPokemon: (
      _: unknown,
      { limit, offset }: { limit?: number; offset?: number },
    ) => pokedex.listPokemon({ limit, offset }),
  },
};

export default resolvers;
