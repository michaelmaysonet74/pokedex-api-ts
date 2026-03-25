export interface Evolution {
  id: string;
  name: string;
}

export interface EvolutionChain {
  from: Evolution;
  to: Evolution[];
}

const normalizeEvolution = (evolution: Evolution | null) =>
  evolution && Object.keys(evolution).length > 0 ? evolution : null;

export const normalizeEvolutionChain = (chain: EvolutionChain) => ({
  from: normalizeEvolution(chain.from),
  to: chain.to.length > 0 ? chain.to.map(normalizeEvolution) : null,
});
