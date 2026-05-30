import { createSchema, createYoga } from "graphql-yoga";
import { useValidationRule } from "@envelop/core";
import { depthLimit } from "@graphile/depth-limit";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const schema = createSchema({ typeDefs, resolvers });
const plugins = [useValidationRule(depthLimit({ maxDepth: 5 }))];

const gql = createYoga({
  schema,
  plugins,
  graphiql: false,
});

export default gql;
