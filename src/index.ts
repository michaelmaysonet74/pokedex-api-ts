import { Hono } from "hono";
import { logger } from "hono/logger";

import gql from "./gql";
import api from "./api";

const app = new Hono();

app.use(logger());
app.use("/graphql", async (c) => gql.handle(c.req.raw));
app.route("/api", api);

export default {
  fetch: app.fetch,
  port: Bun.env.PORT ?? 8080,
};
