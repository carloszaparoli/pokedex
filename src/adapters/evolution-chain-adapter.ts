import { getItemInfo, getPokemonDetailsByName } from "@/services/pokemon";
import { EvolutionChainResponse, EvolutionNode } from "@/types/api-response";
import { EvolutionChain, ItemInfo, PokemonDetails } from "@/types/pokemon";

export async function mapEvolutionChain(
  chain: EvolutionChainResponse
): Promise<EvolutionChain[]> {
  const evolutionSteps: EvolutionChain[] = [];

  async function traverseEvolution(
    current: EvolutionNode,
    from: PokemonDetails
  ) {
    if (!current.evolves_to || current.evolves_to.length === 0) return;

    for (const next of current.evolves_to) {
      const to = await getPokemonDetailsByName(next.species.name);
      const detail = next.evolution_details[0];
      let item: ItemInfo | undefined;

      if (detail.item) {
        item = await getItemInfo(detail.item.name);
      }

      evolutionSteps.push({
        from,
        to,
        minLevel: detail.min_level,
        item,
      });

      await traverseEvolution(next, to);
    }
  }

  const firstPokemon = await getPokemonDetailsByName(chain.chain.species.name);
  await traverseEvolution(chain.chain, firstPokemon);

  return evolutionSteps;
}
