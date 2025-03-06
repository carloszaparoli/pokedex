import { POKEMON_TYPE_LABELS } from "@/constants/pokemon";
import { PokemonType } from "@/types/pokemon";
import { X } from "lucide-react";

interface PokemonFilterResultsProps {
  totalPokemon: number;
  selectedType: PokemonType | null;
  searchQuery: string;
  loading: boolean;
  onCleanFilter: () => void;
}

export function PokemonFilterResults({
  totalPokemon,
  selectedType,
  searchQuery,
  loading,
  onCleanFilter,
}: PokemonFilterResultsProps) {
  const typeLabel = selectedType ? POKEMON_TYPE_LABELS[selectedType] : "";
  const searchLabel = searchQuery ? `"${searchQuery}"` : "";
  const showType = Boolean(selectedType);
  const showSearch = Boolean(searchQuery);

  return (
    <div className="flex items-center justify-between gap-2 py-3 transition-colors duration-300 border-b border-gray-200 dark:border-bluewood-800 text-gray-500 dark:text-bluewood-400">
      {loading ? (
        <div className="h-[20px] w-[200px] my-0.5 bg-gray-200 dark:bg-bluewood-800 rounded-sm animate-pulse transition-colors duration-300" />
      ) : (
        <>
          <div>
            <span>
              <strong>{totalPokemon}</strong> Pokémon found{" "}
              {showSearch && (
                <>
                  for <strong>{searchLabel}</strong>
                </>
              )}
              {showType && (
                <>
                  {" "}
                  of type <strong>{typeLabel}</strong>
                </>
              )}
            </span>
          </div>

          {(showType || showSearch) && (
            <button
              className="text-red-200 hover:text-red-500 text-sm font-medium flex items-center gap-1 cursor-pointer"
              onClick={onCleanFilter}
            >
              <X className="size-4" />
              Clean filter
            </button>
          )}
        </>
      )}
    </div>
  );
}
