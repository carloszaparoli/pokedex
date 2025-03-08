"use client";

import {
  getAllPokemonUrls,
  getPokemonDetailsByUrl,
  getPokemonUrlsByType,
} from "@/services/pokemon";
import { PokemonList } from "@/components/pokemon-list";
import { PokemonFilters } from "@/components/pokemon-filters";
import { useEffect, useMemo, useState } from "react";
import { Pokemon, PokemonType, PokemonUrl } from "@/types/pokemon";
import { useRouter, useSearchParams } from "next/navigation";
import { NoPokemonFound } from "@/components/no-pokemon-found";
import { PokemonFilterResults } from "@/components/pokemon-filter-results";
import { POKEMON_TYPES } from "@/constants/pokemon";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [allPokemonUrls, setAllPokemonUrls] = useState<PokemonUrl[]>([]);
  const [filteredPokemonUrls, setFilteredPokemonUrls] = useState<PokemonUrl[]>(
    []
  );
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoadingUrls, setIsLoadingUrls] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const initialType = searchParams.get("type");
  const [selectedType, setSelectedType] = useState<PokemonType | null>(
    POKEMON_TYPES.includes(initialType as PokemonType)
      ? (initialType as PokemonType)
      : null
  );
  const [paginatedUrls, setPaginatedUrls] = useState<PokemonUrl[] | null>(null);

  const POKEMONS_PER_PAGE = 15;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  const handleSelectType = (type: PokemonType | null) => {
    setSelectedType(selectedType === type ? null : type);
  };

  const handleCleanFilter = () => {
    setSelectedType(null);
    setSearchQuery("");
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("search", searchQuery);
    if (selectedType) params.set("type", selectedType);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [router, searchQuery, selectedType]);

  useEffect(() => {
    async function fetchAllUrls() {
      setIsLoadingUrls(true);
      const { results, count } = await getAllPokemonUrls();

      setTotalPokemon(count);
      setAllPokemonUrls(results);
      setFilteredPokemonUrls(results);

      setIsLoadingUrls(false);
    }

    fetchAllUrls();
  }, []);

  useEffect(() => {
    if (allPokemonUrls.length === 0) return;

    async function filterPokemons() {
      setIsLoadingDetails(true);
      let filteredUrls = allPokemonUrls;

      if (selectedType) {
        filteredUrls = await getPokemonUrlsByType(selectedType);
      }

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

  useEffect(() => {
    if (filteredPokemonUrls.length === 0) return;

    const start = (page - 1) * POKEMONS_PER_PAGE;
    const end = start + POKEMONS_PER_PAGE;

    setPaginatedUrls(filteredPokemonUrls.slice(start, end));
  }, [filteredPokemonUrls, page]);

  useEffect(() => {
    async function fetchPokemonDetails() {
      if (paginatedUrls === null) return;

      setIsLoadingDetails(true);
      const details = await Promise.all(
        paginatedUrls.map((p) => getPokemonDetailsByUrl(p.url))
      );
      setPokemons(details);
      setIsLoadingDetails(false);
    }

    fetchPokemonDetails();
  }, [paginatedUrls]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPokemonUrls.length / POKEMONS_PER_PAGE),
    [filteredPokemonUrls.length]
  );

  const noPokemonFound =
    !isLoadingUrls && // Já carregou a lista de URLs
    totalPokemon === 0 && // Não há Pokémon após os filtros
    (selectedType || searchQuery); // Algum filtro foi aplicado

  return (
    <>
      <div className="py-8 space-y-10">
        <div className="space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-center leading-none mb-4">
              Welcome to the Pokédex! 🔥
            </h1>
            <p className="text-gray-500 dark:text-bluewood-400 text-center">
              Search for your favorite Pokémon by name or explore them by type
            </p>
          </div>

          <PokemonFilters
            searchQuery={searchQuery}
            selectedType={selectedType}
            onSearch={handleChangeSearchQuery}
            onSelectType={handleSelectType}
            disabledFilters={false}
          />
        </div>

        {noPokemonFound ? (
          <NoPokemonFound />
        ) : (
          <div className="space-y-5">
            <PokemonFilterResults
              searchQuery={searchQuery}
              selectedType={selectedType}
              totalPokemon={totalPokemon}
              loading={isLoadingUrls}
              onCleanFilter={handleCleanFilter}
            />

            <PokemonList
              loading={isLoadingDetails}
              pokemons={pokemons}
              page={page}
              totalPages={totalPages}
              pokemonsPerPage={POKEMONS_PER_PAGE}
              onChangePage={handleChangePage}
            />
          </div>
        )}
      </div>
    </>
  );
}
