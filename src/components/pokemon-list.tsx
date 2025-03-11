import { Pokemon } from "@/types/pokemon";
import { PokemonCard } from "./pokemon-card";
import { PokemonSkeletonCard } from "./pokemon-skeleton-card";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PokemonListProps {
  pokemons: Pokemon[];
  loading: boolean;
  page: number;
  totalPages: number;
  pokemonsPerPage: number;
  onChangePage: (newPage: number) => void;
}

export function PokemonList({
  pokemons,
  loading,
  page,
  totalPages,
  pokemonsPerPage,
  onChangePage,
}: PokemonListProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 md:mb-12">
        {loading
          ? Array.from({ length: pokemonsPerPage }).map((_i, index) => (
              <PokemonSkeletonCard key={index} />
            ))
          : pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
      </div>
      <div className="flex items-center justify-center gap-5">
        <button
          title="First page"
          className="not-disabled:cursor-pointer size-12 flex items-center justify-center rounded-lg border transition-colors duration-300 disabled:opacity-50 
          text-red-200 
          bg-white
          border-gray-200
          not-disabled:hover:bg-red-200
          not-disabled:hover:text-white
          not-disabled:hover:border-red-200
          dark:bg-bluewood-900 
          dark:border-bluewood-800 
          dark:text-bluewood-100 dark:not-disabled:hover:bg-red-200 dark:not-disabled:hover:border-red-200"
          disabled={page === 1}
          onClick={() => onChangePage(1)}
        >
          <ChevronsLeft />
        </button>
        <button
          title="Previous page"
          className="not-disabled:cursor-pointer size-12 flex items-center justify-center rounded-lg border transition-colors duration-300 disabled:opacity-50
          text-red-200 
          bg-white
          border-gray-200
          not-disabled:hover:bg-red-200
          not-disabled:hover:text-white
          not-disabled:hover:border-red-200
          dark:bg-bluewood-900 dark:border-bluewood-800 dark:text-bluewood-100 dark:not-disabled:hover:bg-red-200 dark:not-disabled:hover:border-red-200"
          disabled={page === 1}
          onClick={() => onChangePage(Math.max(page - 1, 1))}
        >
          <ChevronLeft />
        </button>
        <span className="text-gray-700 dark:text-bluewood-400">
          page {page} of {totalPages}
        </span>
        <button
          title="Next page"
          className="not-disabled:cursor-pointer size-12 flex items-center justify-center rounded-lg border transition-colors duration-300 disabled:opacity-50 
          text-red-200 
          bg-white
          border-gray-200
          not-disabled:hover:bg-red-200
          not-disabled:hover:text-white
          not-disabled:hover:border-red-200
          dark:bg-bluewood-900 dark:border-bluewood-800 dark:text-bluewood-100 dark:not-disabled:hover:bg-red-200 dark:not-disabled:hover:border-red-200"
          disabled={page === totalPages}
          onClick={() => onChangePage(Math.min(page + 1, totalPages))}
        >
          <ChevronRight />
        </button>
        <button
          title="Last page"
          className="not-disabled:cursor-pointer size-12 flex items-center justify-center rounded-lg border transition-colors duration-300 disabled:opacity-50 
          text-red-200 
          bg-white
          border-gray-200
          not-disabled:hover:bg-red-200
          not-disabled:hover:text-white
          not-disabled:hover:border-red-200
          dark:bg-bluewood-900 dark:border-bluewood-800 dark:text-bluewood-100 dark:not-disabled:hover:bg-red-200 dark:not-disabled:hover:border-red-200"
          disabled={page === totalPages}
          onClick={() => onChangePage(totalPages)}
        >
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}
