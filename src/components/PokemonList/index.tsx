import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { capitalizeText } from '../../utils/capitalizeText'
import { PokemonCard } from '../PokemonCard'
import { Search } from '../Search'
import { SkeletonCardList } from "../SkeletonCardList"
import { TypeListFilter } from "../TypeListFilter"

import styles from './styles.module.scss'

type PokemonBasicData = {
    name: string;
    url: string;
}

type Type = {
    name: string;
}

type Pokemon = {
    id: number;
    idAsString: string;
    name: string;
    nameLowerCase: string;
    image: string;
    types: Type[];
}

export function PokemonList() {
    const [allPokemons, setAllPokemons] = useState<PokemonBasicData[]>([])
    const [filteredPokemons, setFilteredPokemons] = useState<PokemonBasicData[]>([])
    const [backupListPokemons, setBackupListPokemons] = useState<PokemonBasicData[]>([])

    const [typeIsSelected, setTypeIsSelected] = useState(false)
    const [searchText, setSearchText] = useState("")

    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [to, setTo] = useState<number>(0)
    const [loading, setLoading] = useState(true)
    const numberPokemonsToShow = 15;

    useEffect(() => {
        async function fetchData() {
            let response = await getPokemonUrl(`pokemon?offset=0&limit=2000`)
            setAllPokemons(response.results)
            setFilteredPokemons(response.results)
            await loadPokemons(response.results.slice(to, numberPokemonsToShow))
        }
        fetchData()
    }, [])

    const loadPokemons = async (data: PokemonBasicData[], cleanList: boolean = false) => {

        if (!cleanList) {
            setTo(to + numberPokemonsToShow)
        } else {
            setLoading(true)
        }

        let _pokemonData: Pokemon[] = await Promise.all(data.map(async (pokemon: PokemonBasicData) => {
            let pokemonRecord = await getPokemonUrl(pokemon.url)

            let types = pokemonRecord.types.map((index): Type => {
                return {
                    name: capitalizeText(index.type.name)
                }
            })

            let pokemonData: Pokemon = {
                id: pokemonRecord.id,
                idAsString: pokemonRecord.id.toString().length <= 3 ? ('000' + pokemonRecord.id).slice(-3) : pokemonRecord.id,
                name: capitalizeText(pokemonRecord.name.replace(/-/g, ' ')),
                nameLowerCase: pokemonRecord.name,
                image: pokemonRecord.sprites.other["official-artwork"].front_default || pokemonRecord.sprites.front_default,
                types: types,
            }

            return pokemonData
        }))

        let pokemonList = []

        if (cleanList) {
            pokemonList = _pokemonData
        } else {
            pokemonList = [...pokemons, ..._pokemonData]
        }

        setPokemons(pokemonList)
        setLoading(false)
    }

    async function getPokemonUrl(url: string) {
        return new Promise<any>((resolve, reject) => {
            api.get(url)
                .then(res => res.data)
                .then(data => resolve(data))
        })
    }

    async function loadMore() {
        await loadPokemons(filteredPokemons.slice(to, to + numberPokemonsToShow))
    }

    async function filterByType(type: string) {
        setTo(15)
        if (type !== "") {
            setTypeIsSelected(true)

            const typeData = await api.get(`type/${type}`)
                .then(resp => resp.data)

            const pokemons = typeData.pokemon.map(index => {
                return {
                    name: index.pokemon.name,
                    url: index.pokemon.url,
                }
            })

            setBackupListPokemons(pokemons)
            setFilteredPokemons(pokemons)

            if(searchText !== "") {
                let pokemonsList = pokemons.filter(pokemon => pokemon.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                setFilteredPokemons(pokemonsList)
                loadPokemons(pokemonsList.slice(0, numberPokemonsToShow), true)
            } else {
                loadPokemons(pokemons.slice(0, numberPokemonsToShow), true)
            }
            
        } else {
            setTypeIsSelected(false)
            console.log(searchText)
            if(searchText !== "") {
                let pokemonsList = allPokemons.filter(pokemon => pokemon.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                setFilteredPokemons(pokemonsList)
                loadPokemons(pokemonsList.slice(0, numberPokemonsToShow), true)
            } else {
                setFilteredPokemons(allPokemons)
                loadPokemons(allPokemons.slice(0, numberPokemonsToShow), true)
            }
        }
    }

    function searchPokemon(text: string) {
        setSearchText(text)
        if (text.length == 0) {
            setTo(15)
            if(typeIsSelected) {
                setFilteredPokemons(backupListPokemons)
                loadPokemons(backupListPokemons.slice(0, numberPokemonsToShow), true)
            } else {
                setFilteredPokemons(allPokemons)
                loadPokemons(allPokemons.slice(0, numberPokemonsToShow), true)
            }
            
        } else {
            let pokemonList = []
            if(typeIsSelected) {
                pokemonList= backupListPokemons.filter(pokemon => pokemon.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
            } else {                
                pokemonList = allPokemons.filter(pokemon => pokemon.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
            }
            setFilteredPokemons(pokemonList)
            loadPokemons(pokemonList, true)
        }
    }

    return (
        <>
            <Search onSearch={searchPokemon} />
            <TypeListFilter onFilter={filterByType} />
            {!loading
                ?
                <>
                    {pokemons.length > 0
                        ?
                        <>
                            <ul className={styles.pokemonList}>
                                {pokemons?.map(pokemon => (
                                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                                ))}
                            </ul>
                            {pokemons.length < filteredPokemons.length
                                && <button className={styles.btnLoadMore} onClick={() => loadMore()}>Load more</button>
                            }
                        </>

                        : <p>No pokémon found.</p>}

                </>
                :
                <SkeletonCardList />
            }
        </>
    )
}