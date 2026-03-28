import { EvolutionNode, EvolutionRecord } from "../db/schema";

const normalizeEvolution = (evolution: EvolutionNode | null) =>
  evolution && Object.keys(evolution).length > 0 ? evolution : null;

export const buildEvolution = (chain: EvolutionRecord) => ({
  from: normalizeEvolution(chain.from),
  to: chain.to.length > 0 ? chain.to.map(normalizeEvolution) : null,
});
