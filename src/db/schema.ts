import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

export const pokemon = pgTable("pokemon", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"),
  entry: text("entry"),
  generation: integer("generation"),
  sprite: text("sprite"),
  types: text("types").array(),
  immunities: text("immunities").array(),
  resistances: text("resistances").array(),
  weaknesses: text("weaknesses").array(),
});

export const pokemonRelations = relations(pokemon, ({ many, one }) => ({
  abilities: many(abilities),

  baseStats: one(baseStats, {
    fields: [pokemon.id],
    references: [baseStats.pokemonId],
  }),

  evolutions: one(evolutions, {
    fields: [pokemon.id],
    references: [evolutions.pokemonId],
  }),

  measurements: one(measurements, {
    fields: [pokemon.id],
    references: [measurements.pokemonId],
  }),
}));

export const abilities = pgTable("abilities", {
  id: serial("id").primaryKey(),

  pokemonId: integer("pokemon_id")
    .notNull()
    .references(() => pokemon.id),

  name: text("name").notNull(),
  effect: text("effect").notNull(),
  isHidden: boolean("is_hidden").notNull(),
});

export const abilityRelations = relations(abilities, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [abilities.pokemonId],
    references: [pokemon.id],
  }),
}));

export const baseStats = pgTable("base_stats", {
  id: serial("id").primaryKey(),

  pokemonId: integer("pokemon_id")
    .notNull()
    .references(() => pokemon.id),

  hp: integer("hp").notNull(),
  attack: integer("attack").notNull(),
  defense: integer("defense").notNull(),
  specialAttack: integer("special_attack").notNull(),
  specialDefense: integer("special_defense").notNull(),
  speed: integer("speed").notNull(),
});

export const baseStatsRelations = relations(baseStats, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [baseStats.pokemonId],
    references: [pokemon.id],
  }),
}));

export const evolutions = pgTable("evolution_chains", {
  id: serial("id").primaryKey(),

  pokemonId: integer("pokemon_id")
    .notNull()
    .references(() => pokemon.id),

  from: jsonb("from"),
  to: jsonb("to"),
});

export const evolutionRelations = relations(evolutions, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [evolutions.pokemonId],
    references: [pokemon.id],
  }),
}));

export const measurements = pgTable("measurements", {
  id: serial("id").primaryKey(),

  pokemonId: integer("pokemon_id")
    .notNull()
    .references(() => pokemon.id),

  height: text("height").notNull(),
  weight: text("weight").notNull(),
});

export const measurementsRelations = relations(measurements, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [measurements.pokemonId],
    references: [pokemon.id],
  }),
}));
