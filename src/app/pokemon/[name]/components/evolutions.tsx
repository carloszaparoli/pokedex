import { EvolutionChain } from "@/types/pokemon";
import { capitalize, formatPokemonId } from "@/utils/formatters";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface EvolutionChainProps {
  evolutions: EvolutionChain[];
}

export function Evolutions({ evolutions }: EvolutionChainProps) {
  if (evolutions.length <= 0) {
    return (
      <p className="dark:text-bluewood-400">This Pokemon does not evolve.</p>
    );
  }

  return (
    <div className="space-y-8">
      {evolutions.map(({ from, to, item, minLevel }) => {
        const formattedFromPokemonId = formatPokemonId(from.id);
        const formattedFromPokemonName = capitalize(from.name);

        const formattedToPokemonId = formatPokemonId(to.id);
        const formattedToPokemonName = capitalize(to.name);

        return (
          <div
            key={`${from.name}-to-${to.name}`}
            className="flex items-center justify-between"
          >
            <div className="text-center">
              <div className="p-3 bg-[url(/pokeball-gradient-dark.svg)] bg-no-repeat bg-[length:156px]">
                <Image
                  src={from.image}
                  alt={formattedFromPokemonName}
                  width={132}
                  height={132}
                />
              </div>
              <span className="text-sm font-medium dark:text-bluewood-500">
                {formattedFromPokemonId}
              </span>
              <h4 className="text-lg font-bold">{formattedFromPokemonName}</h4>
            </div>

            <div className="flex flex-col items-center gap-2">
              <ArrowRight className="size-8 dark:text-bluewood-700" />
              {minLevel && (
                <span className="block text-sm font-bold">
                  Level {minLevel}
                </span>
              )}
              {item && (
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={30}
                    height={30}
                  />
                  <span className="block text-sm font-bold">{item.name}</span>
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="p-3 dark:bg-[url(/pokeball-gradient-dark.svg)] bg-no-repeat bg-[length:156px]">
                <Image
                  src={to.image}
                  alt={formattedToPokemonName}
                  width={132}
                  height={132}
                />
              </div>
              <span className="text-sm font-medium dark:text-bluewood-500">
                {formattedToPokemonId}
              </span>
              <h4 className="text-lg font-bold">{formattedToPokemonName}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}
