import { Hono } from "hono";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";

import gql from "./gql";
import api from "./api";

const app = new Hono();
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

app.use(logger());
app.use("/graphql", async (c) => gql.handle(c.req.raw));
app.route("/api", api);

serve({ ...app, port });
