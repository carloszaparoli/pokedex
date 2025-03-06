import { PokemonType, Stats } from "@/types/pokemon";

interface StatsTableProps {
  type: PokemonType;
  stats: Stats[];
}

export function StatsTable({ type, stats }: StatsTableProps) {
  const total = stats.reduce((sum, stat) => sum + stat.value, 0);

  const bgTypePrimaryColors: { [key: string]: string } = {
    bug: "bg-type-bug-primary",
    dark: "bg-type-dark-primary",
    dragon: "bg-type-dragon-primary",
    electric: "bg-type-electric-primary",
    fairy: "bg-type-fairy-primary",
    fighting: "bg-type-fighting-primary",
    fire: "bg-type-fire-primary",
    flying: "bg-type-flying-primary",
    ghost: "bg-type-ghost-primary",
    grass: "bg-type-grass-primary",
    ground: "bg-type-ground-primary",
    ice: "bg-type-ice-primary",
    normal: "bg-type-normal-primary",
    poison: "bg-type-poison-primary",
    psychic: "bg-type-psychic-primary",
    rock: "bg-type-rock-primary",
    steel: "bg-type-steel-primary",
    water: "bg-type-water-primary",
  };

  return (
    <div className="space-y-4">
      <div>
        {stats.map(({ name, value, minValue, maxValue, percentage }) => (
          <div key={name} className="flex items-center gap-4 py-1.5">
            <span className="w-14 font-bold text-sm text-gray-900 dark:text-bluewood-100">
              {name}
            </span>
            <span className="w-8 text-gray-500 dark:text-bluewood-400 text-right text-base">
              {value}
            </span>

            <div className="flex-1 h-2 bg-gray-100 dark:bg-bluewood-950 rounded-full overflow-hidden transition-colors duration-300">
              <div
                className={`h-full rounded-full ${bgTypePrimaryColors[type]}`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <span className="w-8 text-gray-500 dark:text-bluewood-400 text-right text-base">
              {minValue}
            </span>
            <span className="w-8 text-gray-500 dark:text-bluewood-400 text-right text-base">
              {maxValue}
            </span>
          </div>
        ))}

        <div className="flex items-center font-bold gap-4 pt-1 text-gray-900 dark:text-bluewood-100">
          <span className="w-14 font-bold text-sm">Total</span>
          <span className="w-8 text-lg">{total}</span>
          <div className="flex-1"></div>
          <span>Min</span>
          <span>Max</span>
        </div>
      </div>
      <p className="text-sm italic text-gray-400 dark:text-bluewood-500">
        The ranges shown on the top are for a level 100 Pokémon. Maximum values
        are based on a beneficial nature, 252 EVs, 31 IVs; minimum values are
        based on a hindering nature, 0 EVs, 0 IVs.
      </p>
    </div>
  );
}
