import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import gql from "./gql";
import api from "./api";

const app = new Hono();
const port = Bun.env.PORT ?? 8080;

app.use(logger());
app.use(prettyJSON());

app.route("/api", api);
app.use("/graphql", async (c) => gql.handle(c.req.raw));

export default { ...app, port };
