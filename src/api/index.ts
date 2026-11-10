import { Hono } from "hono";

import pokedex, { Pokemon } from "../pokedex";

const api = new Hono().basePath("/v1/pokemon");

api.get("/list", async (c) => {
  const limit = c.req.query("limit");
  const offset = c.req.query("offset");

  const filters: { limit?: number; offset?: number } = {};

  if (limit) {
    const parsedLimit = parseInt(limit);
    if (isNaN(parsedLimit) || parsedLimit < 0) {
      return c.text("Invalid query parameter limit=.", 400);
    }
    filters.limit = parsedLimit;
  }

  if (offset) {
    const parsedOffset = parseInt(offset);
    if (isNaN(parsedOffset) || parsedOffset < 0) {
      return c.text("Invalid query parameter offset=.", 400);
    }
    filters.offset = parsedOffset;
  }

  const pokemonList = await pokedex.listPokemon(filters);
  return c.json<Pokemon[]>(pokemonList ?? []);
});

api.get("/generation/:gen", async (c) => {
  const { gen } = c.req.param();
  const generationNum = parseInt(gen);

  if (isNaN(generationNum)) return c.text("Invalid generation number.", 400);

  const pokemonList = await pokedex.listPokemonByGeneration(generationNum);
  return c.json<Pokemon[]>(pokemonList ?? []);
});

api.get("/:id", async (c) => {
  const { id } = c.req.param();
  const pokemonId = parseInt(id);

  if (isNaN(pokemonId)) return c.text("Invalid Pokemon ID.", 400);

  const pokemon = await pokedex.getPokemonById(pokemonId);
  return pokemon ? c.json<Pokemon>(pokemon) : c.text("Pokemon not found.", 404);
});

api.get("/", async (c) => {
  const { name } = c.req.query();

  if (!name) return c.text("Query parameter name= is required.", 400);

  const pokemon = await pokedex.getPokemonByName(name);
  return pokemon ? c.json<Pokemon>(pokemon) : c.text("Pokemon not found.", 404);
});

export default api;
