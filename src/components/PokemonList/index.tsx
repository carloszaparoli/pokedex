import Link from 'next/link'
import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { capitalizeText } from '../../utils/capitalizeText'

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
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [urlNext, setUrlNext] = useState<number>(0)

    useEffect(() => {
        async function fetchData() {
            let response = await getPokemonUrl(`pokemon?offset=${urlNext}&limit=12`)
            await loadingPokemon(response.results)
        }
        fetchData()
    }, [urlNext])

    const loadingPokemon = async (data: PokemonBasicData[]) => {
        let _pokemonData: Pokemon[] = await Promise.all(data.map(async (pokemon: PokemonBasicData) => {
            let pokemonRecord = await getPokemonUrl(pokemon.url)

            let types = pokemonRecord.types.map((index): Type => {
                return {
                    name: capitalizeText(index.type.name)
                }
            })

            let pokemonData: Pokemon = {
                id: pokemonRecord.id,
                idAsString: ('000' + pokemonRecord.id).slice(-3),
                name: capitalizeText(pokemonRecord.name),
                nameLowerCase: pokemonRecord.name,
                image: pokemonRecord.sprites.other["official-artwork"].front_default,
                types: types
            }

            return pokemonData
        }))

        let pokemonList = [...pokemons, ..._pokemonData]

        setPokemons(pokemonList)
    }

    async function getPokemonUrl(url: string) {
        return new Promise<any>((resolve, reject) => {
            api.get(url)
                .then(res => res.data)
                .then(data => resolve(data))
        })
    }

    return (
        <>
            <ul className={styles.pokemonList}>
                {pokemons?.map(pokemon => (
                    <li className={styles.pokemon} key={pokemon.id}>
                        <Link href={'pokemon/' + pokemon.nameLowerCase}>
                            <a className={styles[pokemon.types[0].name]}>
                                <div>
                                    <img src="/images/pattern.svg" className={styles.patternImage} alt="pattern" />
                                    <span className={styles.number}>#{pokemon.idAsString}</span>
                                    <h3 className={styles.name}>{pokemon.name}</h3>
                                    <ul className={styles.typeList}>
                                        {pokemon.types.map(type => (
                                            <li key={type.name} className={styles[type.name]}>
                                                <img src={`/images/types/${type.name}.svg`} alt={type.name} height={12} />
                                                {type.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <img src={pokemon.image}
                                    alt={pokemon.name}
                                    width={130}
                                    className={styles.image}
                                />
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={() => setUrlNext(urlNext + 12)}>Load more</button>
        </>
    )
}