import { Hono } from "hono";
import { logger } from "hono/logger";

import gql from "./gql";
import pokedex from "./pokedex";

const app = new Hono();

app.use(logger());

app.use("/graphql", async (c) => gql.handle(c.req.raw));

app.get("/api/v1/pokemon/:id", async (c) => {
  const { id } = c.req.param();
  const pokemonId = parseInt(id);

  if (isNaN(pokemonId)) return c.text("Invalid Pokemon ID.", 400);

  const pokemon = await pokedex.getPokemonById(pokemonId);

  return pokemon ? c.json(pokemon) : c.text("Pokemon not found.", 404);
});

app.get("/api/v1/pokemon", async (c) => {
  const { name } = c.req.query();

  if (!name) return c.text("Query parameter name= is required.", 400);

  const pokemon = await pokedex.getPokemonByName(name);

  return pokemon ? c.json(pokemon) : c.text("Pokemon not found.", 404);
});

export default {
  fetch: app.fetch,
  port: Bun.env.PORT ?? 8080,
};
