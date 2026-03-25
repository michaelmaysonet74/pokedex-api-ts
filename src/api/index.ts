import { Hono } from "hono";

import pokedex from "../pokedex";

const api = new Hono();

api.get("/v1/pokemon/:id", async (c) => {
  const { id } = c.req.param();
  const pokemonId = parseInt(id);

  if (isNaN(pokemonId)) return c.text("Invalid Pokemon ID.", 400);

  const pokemon = await pokedex.getPokemonById(pokemonId);

  return pokemon ? c.json(pokemon) : c.text("Pokemon not found.", 404);
});

api.get("/v1/pokemon", async (c) => {
  const { name } = c.req.query();

  if (!name) return c.text("Query parameter name= is required.", 400);

  const pokemon = await pokedex.getPokemonByName(name);

  return pokemon ? c.json(pokemon) : c.text("Pokemon not found.", 404);
});

export default api;
