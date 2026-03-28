import { BaseStatsRecord } from "../db/schema";

const BASE_STATS_KEYS = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
] as const;

export const buildBaseStats = (baseStats: BaseStatsRecord) => ({
  hp: baseStats.hp,
  attack: baseStats.attack,
  defense: baseStats.defense,
  specialAttack: baseStats.specialAttack,
  specialDefense: baseStats.specialDefense,
  speed: baseStats.speed,
  total: BASE_STATS_KEYS.reduce(
    (total, key) => total + (baseStats[key] ?? 0),
    0,
  ),
});
