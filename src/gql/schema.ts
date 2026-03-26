export const typeDefs = `
  type Pokemon {
    id: Int!
    name: String!
    abilities: [Ability!]!
    baseStats: BaseStats!
    category: String!
    entry: String!
    evolution: EvolutionChain!
    generation: Int!
    measurement: Measurement!
    sprite: String!
    types: [String!]!
    immunities: [String!]!
    resistances: [String!]!
    weaknesses: [String!]!
  }

  type Ability {
    name: String!
    effect: String
    isHidden: Boolean!
  }

  type BaseStats {
    hp: Int!
    attack: Int!
    defense: Int!
    specialAttack: Int!
    specialDefense: Int!
    speed: Int!
  }

  type EvolutionChain {
    from: Evolution
    to: [Evolution!]
  }

  type Evolution {
    id: ID!
    name: String!
  }

  type Measurement {
    height: String!
    weight: String!
  }

  type Query {
    pokemonById(id: Int!): Pokemon
    pokemonByName(name: String!): Pokemon
  }
`;

export default typeDefs;
