import { createSchema, createYoga } from "graphql-yoga";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphiql: false,
});

export default yoga;
