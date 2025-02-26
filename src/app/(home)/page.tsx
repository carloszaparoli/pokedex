"use client";

import {
  getAllPokemonUrls,
  getPokemonDetails,
  getPokemonUrlsByType,
} from "@/services/pokemon";
import { Header } from "../../components/header";
import { PokemonList } from "@/components/pokemon-list";
import { PokemonFilters } from "@/components/pokemon-filters";
import { useEffect, useMemo, useState } from "react";
import { Pokemon, PokemonType, PokemonUrl } from "@/types/pokemon";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { POKEMON_TYPE_LABELS } from "@/constants/pokemon";

export default function HomePage() {
  const searchParams = useSearchParams();
  // const router = useRouter();

  const [allPokemonUrls, setAllPokemonUrls] = useState<PokemonUrl[]>([]);
  const [filteredPokemonUrls, setFilteredPokemonUrls] = useState<PokemonUrl[]>(
    []
  );
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PokemonType | null>(null);

  const POKEMONS_PER_PAGE = 15;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeSearchQuery = (value: string) => {
    setSearchQuery(value);
    setPokemons([]);
  };

  const handleSelectType = (type: PokemonType | null) => {
    setPokemons([]);
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
    }
  };

  const handleCleanFilter = () => {
    setSelectedType(null);
    setSearchQuery("");
    setPokemons([]);
  };

  // useEffect(() => {
  //   const params = new URLSearchParams();
  //   params.set("page", page.toString());
  //   router.replace(`?${params.toString()}`, { scroll: false });
  // }, [page, router]);

  useEffect(() => {
    async function fetchAllUrls() {
      const { results, count } = await getAllPokemonUrls();

      setTotalPokemon(count);
      setAllPokemonUrls(results);
      setFilteredPokemonUrls(results);
    }

    fetchAllUrls();
  }, []);

  useEffect(() => {
    async function filterPokemons() {
      let filteredUrls = allPokemonUrls;

      if (selectedType) {
        filteredUrls = await getPokemonUrlsByType(selectedType);
      }
      console.log("searchQuery: ", searchQuery);
      if (searchQuery) {
        filteredUrls = filteredUrls.filter((pokemon) =>
          pokemon.name.includes(searchQuery.toLowerCase())
        );
      }

      setTotalPokemon(filteredUrls.length);
      setFilteredPokemonUrls(filteredUrls);
      setPage(1);
    }

    filterPokemons();
  }, [searchQuery, selectedType, allPokemonUrls]);

  const totalPages = Math.ceil(filteredPokemonUrls.length / POKEMONS_PER_PAGE);

  const paginatedUrls = useMemo(() => {
    const start = (page - 1) * POKEMONS_PER_PAGE;
    const end = start + POKEMONS_PER_PAGE;
    return filteredPokemonUrls.slice(start, end);
  }, [filteredPokemonUrls, page]);

  useEffect(() => {
    async function fetchPokemonDetails() {
      setIsLoading(true);

      console.log(paginatedUrls);

      const details = await Promise.all(
        paginatedUrls.map((p) => getPokemonDetails(p.url))
      );
      setPokemons((prevPokemons) => [...prevPokemons, ...details]);
      setIsLoading(false);
    }

    fetchPokemonDetails();
  }, [paginatedUrls]);

  const hasActiveFilters = !!selectedType || searchQuery;

  return (
    <>
      <Header />
      <div className="py-8 space-y-10">
        <div className="space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-center leading-none mb-4">
              Welcome to the Pokédexx! 🔥
            </h1>
            <p className="text-gray-400 text-center">
              Search for your favorite Pokémon by name or explore them by type
            </p>
          </div>

          <PokemonFilters
            searchQuery={searchQuery}
            selectedType={selectedType}
            onSearch={handleChangeSearchQuery}
            onSelectType={handleSelectType}
            disabledFilters={isLoading}
          />
        </div>

        <div className="space-y-5">
          {hasActiveFilters && (
            <div className="flex items-center justify-between gap-2 border-b border-gray-900 py-3">
              <span className="text-gray-400">
                {totalPokemon} results found for:{" "}
                {selectedType && !searchQuery && (
                  <span>
                    type <strong>{POKEMON_TYPE_LABELS[selectedType]}</strong>
                  </span>
                )}
                {!selectedType && searchQuery && (
                  <strong>{`"${searchQuery}"`}</strong>
                )}
                {selectedType && searchQuery && (
                  <span>
                    <strong>{`"${searchQuery}"`}</strong> of type{" "}
                    <strong>{POKEMON_TYPE_LABELS[selectedType]}</strong>
                  </span>
                )}
              </span>
              <button
                className="text-red-200 hover:text-red-500 text-sm font-medium flex items-center gap-1 cursor-pointer"
                onClick={handleCleanFilter}
              >
                <X className="size-4" />
                Clean filter
              </button>
            </div>
          )}

          <PokemonList
            loading={isLoading}
            pokemons={pokemons}
            page={page}
            totalPages={totalPages}
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </>
  );
}
