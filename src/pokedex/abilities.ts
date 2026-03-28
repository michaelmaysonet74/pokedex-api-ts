import { AbilityRecord } from "../db/schema";

export const buildAbility = (ability: AbilityRecord) => ({
  name: ability.name,
  effect: ability.effect,
  isHidden: ability.isHidden,
});
