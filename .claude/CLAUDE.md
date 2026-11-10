# Code Style Rules

## 1. Always run Prettier after writing or editing files

Run `npx prettier --write <file>` whenever you create or modify a file to ensure consistent formatting.

## 2. Align closing brackets with opening lines

Match the indentation of closing brackets (`}`, `]`, `)`) to the column position of their corresponding opening keyword/bracket. Don't use extra indentation — keep it consistent with the rest of the codebase.

---

# Architecture Overview

The project is a **Pokédex REST + GraphQL API** backed by PostgreSQL. The codebase is organized in a clear layer-based architecture: `src/index.ts` (entry point) → routes → pokedex (business logic) → db (PostgreSQL via Drizzle).

## Directory Structure

| Path           | Role                                           |
| -------------- | ---------------------------------------------- |
| `src/api/`     | REST API routes (Hono)                         |
| `src/gql/`     | GraphQL server, schema & resolvers             |
| `src/pokedex/` | Business logic: data retrieval, model building |
| `src/db/`      | Drizzle ORM config and relational schema       |
| `src/cache/`   | In-memory LRU cache                            |

## Request Flow

```
Client → Hono app → Route handler → Pokedex module → Drizzle → PostgreSQL
                                     ↓
                                Cache (LRU) hit / miss
```

1. **Entry point** (`src/index.ts`): Creates a Hono server, mounts `/api` and `/graphql`, sets up middleware (logger, pretty JSON). Exports the app with port 8080 (or `Bun.env.PORT`).

2. **REST API** (`src/api/`): Routes live under `/v1/pokemon`. Endpoints:
   - `GET /list` — paginated list (`limit`, `offset` query params)
   - `GET /generation/:gen` — all Pokémon in a generation
   - `GET /:id` — by numeric ID
   - `GET /?name=` — by name

3. **GraphQL** (`src/gql/`): Served via [graphql-yoga](https://the-guild.dev/graphql/yoga-server) at `/graphql`. No GraphiQL UI. A single validation rule enforces query depth ≤ 5 via `@graphile/depth-limit`.

4. **Business logic** (`src/pokedex/`): Exports an object with four methods (`getPokemonById`, `getPokemonByName`, `listPokemonByGeneration`, `listPokemon`). Each builds plain JS objects from Drizzle results using per-entity "builder" functions (e.g., `buildPokemon`, `buildAbility`).

5. **Database** (`src/db/`): Uses [Drizzle ORM](https://drizzle.team) with the `node-postgres` adapter and a raw `pg.Pool`. The schema defines five tables with one-to-many / one-to-one relations (`pokemonRelations`, `abilityRelations`, etc.).

6. **Cache** (`src/cache/`): An in-memory LRU cache (max 2050 entries, 1-hour TTL). Wrapped by `cacheResult(key, cb)` — returns immediately if the key exists, otherwise calls the async function and stores the result.

## Key Patterns

- **Builder functions**: Each entity module exports a `buildX` function that transforms raw Drizzle records into plain objects.
- **Drizzle table relations**: One-to-many (`many`) for abilities; one-to-one (`one`) for baseStats, evolutions, measurements.
- **Pagination in SQL**: `limit` and `offset` are passed directly to Drizzle's `findMany()`, so they translate to SQL-level clauses instead of in-memory slices.
- **Type safety via `$inferSelect`**: Schema types (e.g., `PokemonRecord`) are inferred from table definitions using Drizzle's built-in inference.

## Tech Stack

| Category       | Tool / Library        |
| -------------- | --------------------- |
| Runtime        | Bun                   |
| Web framework  | Hono v4               |
| Database ORM   | Drizzle ORM v0.45     |
| DB driver      | node-postgres (pg) v8 |
| GraphQL server | graphql-yoga v5       |
| Cache          | lru-cache v11         |
| Query limiter  | @graphile/depth-limit |

## Running

```bash
bun run --hot src/index.ts   # dev server with hot reload (default port 8080)
```
