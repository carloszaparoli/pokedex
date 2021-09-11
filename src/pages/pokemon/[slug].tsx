import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { GetStaticPaths, GetStaticProps } from "next"

import { api } from "../../services/api"
import { capitalizeText } from "../../utils/capitalizeText"

import { EvolutionChain } from "../../components/EvolutionChain"
import { Header } from "../../components/Header"
import { Icon } from "../../components/Icon"
import { StatList } from "../../components/StatList"

import styles from './pokemon.module.scss'

type Ability = {
    name: string;
    isHidden: boolean;
}

type Type = {
    name: string;
}

type Stat = {
    name: string;
    value: number;
    minValue: number;
    maxValue: number;
    percentage: number;
}

type EggGroups = {
    name: string;
}

type EvolutionChain = {
    id: number;
    idAsString: string;
    name: string;
    nameLowerCase: string;
    image: string;
    minLevel: number;
    triggerName: string;
    item: string;
    imageItem: string;
    evolvesFrom: string;
}

type Pokemon = {
    id: number;
    idAsString: string;
    name: string;
    image: string;
    description: string;
    abilities: Ability[];
    types: Type[];
    stats: Stat[];
    eggGroups: EggGroups[];
    maleRatio: number;
    femaleRatio: number;
    height: number;
    weight: number;
    catchRate: number;
    baseFriendship: number;
    evolutionChain: EvolutionChain[];
}

type PokemonPageProps = {
    pokemon: Pokemon;

}

export default function PokemonPage({ pokemon }: PokemonPageProps) {

    return (
        <>
            <Head>
                <title>{pokemon.name} | Pokédex</title>
            </Head>
            <Header />
            <main className={`${styles.pokemonContainer} ${styles[pokemon.types[0].name]}`}>
                <div className={styles.header}>
                    <div className={styles.backContainer}>
                        <Link href="/">
                            <a className={styles.linkBack} title="Go back">
                                <Icon iconName="arrow-right" />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.headerWrapper}>
                        <div>
                            <span className={styles.number}>#{pokemon.idAsString}</span>
                            <h1 className={styles.title}>{pokemon.name}</h1>
                            <ul className={styles.typeList}>
                                {pokemon.types.map(type => (
                                    <li key={type.name} className={styles[type.name]}>
                                        <Icon iconName={type.name} />
                                        {type.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.pokemonImage}>
                            <Image src={pokemon.image} width={220} height={220} alt={pokemon.name} />
                        </div>
                    </div>
                    <Icon iconName="pattern" className={styles.patternIcon} />
                </div>
                <div className={styles.pokemonData}>
                    <p className={styles.description}>{pokemon.description}</p>
                    <section>
                        <p className={styles.titleSection}>Pokédex Data</p>
                        <ul className={styles.pokedexDataList}>
                            <li>
                                <span className={styles.label}>Height</span>
                                <div>
                                    <span className={styles.value}>{pokemon.height}m</span>
                                </div>
                            </li>
                            <li>
                                <span className={styles.label}>Weight</span>
                                <div>
                                    <span className={styles.value}>{pokemon.weight}kg</span>
                                </div>
                            </li>
                            <li>
                                <span className={styles.label}>Abilities</span>
                                <ul className={styles.abilitiesList}>
                                    {pokemon.abilities.map(ability => (
                                        <li key={ability.name} className={`${styles.value} ${ability.isHidden ? styles.hiddenAbility : null}`}>
                                            {ability.name}
                                            {ability.isHidden ? ' (hidden ability)' : null}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <p className={styles.titleSection}>Training</p>
                        <ul className={styles.trainingList}>
                            <li>
                                <span className={styles.label}>Catch Rate</span>
                                <div>
                                    <span className={styles.value}>{pokemon.catchRate}</span>
                                </div>
                            </li>
                            <li>
                                <span className={styles.label}>Base Friendship</span>
                                <div>
                                    <span className={styles.value}>{pokemon.baseFriendship}</span>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <p className={styles.titleSection}>Breeding</p>
                        <ul className={styles.breedingList}>
                            <li>
                                <span className={styles.label}>Gender Ratio</span>
                                <div>
                                    {pokemon.femaleRatio >= 0
                                        ?
                                        <>
                                            <span className={styles.maleText}>
                                                <Icon iconName="male" />
                                                {pokemon.maleRatio}%
                                            </span>
                                            , <span className={styles.femaleText}>
                                                <Icon iconName="female" />
                                                {pokemon.femaleRatio}%
                                            </span>
                                        </>
                                        :
                                        <span>Gender unknown</span>
                                    }
                                </div>
                            </li>
                            <li>
                                <span className={styles.label}>Egg Groups</span>
                                <div>
                                    <span>
                                        {pokemon.eggGroups.map(eggGroup => (
                                            eggGroup.name
                                        )).join(", ")}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <p className={styles.titleSection}>Base Stats</p>
                        <StatList stats={pokemon.stats} pokemonType={pokemon.types[0].name} />
                    </section>
                    <section>
                        <p className={styles.titleSection}>Evolutions</p>
                        <EvolutionChain evolutionChain={pokemon.evolutionChain} />
                    </section>
                </div>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get('pokemon?offset=0&limit=2000')

    const paths = data.results.map(pokemon => {
        return {
            params: {
                slug: pokemon.name
            }
        }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    const pokemonData = await api.get(`pokemon/${context.params.slug}`)
        .then(resp => resp.data)
        .catch((err) => {
        })

    if(!pokemonData) {
        return {
            props: {},
            notFound: true,
        }
    }

    const pokemonSpecieData = await api.get(`pokemon-species/${pokemonData.species.name}`)
        .then(resp => resp.data)

    const evolutionChainData = await api.get(pokemonSpecieData.evolution_chain.url)
        .then(resp => resp.data)

    let flavorTextEntries = pokemonSpecieData.flavor_text_entries.find(index => index.version.name === 'firered')

    if (!flavorTextEntries) {
        flavorTextEntries = pokemonSpecieData.flavor_text_entries.find(index => index.language.name === 'en')
    }

    const abilities = pokemonData.abilities.map((index): Ability => {
        return {
            name: capitalizeText(index.ability.name),
            isHidden: index.is_hidden
        }
    })

    const types = pokemonData.types.map((index): Type => {
        return {
            name: capitalizeText(index.type.name)
        }
    })

    const IV = 31
    const EV = 252
    const level = 100
    const nature = 1.1 // 10%

    const stats = pokemonData.stats.map((index): Stat => {
        let minValue: number = 0
        let maxValue: number = 0

        let name: string = capitalizeText(index.stat.name.replace(/-/g, ' '))

        switch (name) {
            case 'Hp':
                name = name.toUpperCase()
                break;

            case 'Special Attack':
                name = "Sp. Atk"
                break;

            case 'Special Defense':
                name = "Sp. Def"
                break;

            default:
                break;
        }

        if (index.stat.name === 'hp') {
            name = name.toUpperCase()
            minValue = Math.floor(0.01 * (2 * index.base_stat) * level) + level + 10
            maxValue = Math.floor(0.01 * (2 * index.base_stat + IV + Math.floor(EV / 4)) * level) + level + 10
        } else {
            let calcMinStat = Math.floor(((0.01 * (2 * index.base_stat) * level) + 5))
            let diferenceNature = (calcMinStat * nature) - calcMinStat

            minValue = Math.floor(calcMinStat - diferenceNature)
            maxValue = Math.floor(((0.01 * (2 * index.base_stat + IV + Math.floor(EV / 4)) * level) + 5) * nature)
        }

        return {
            name: name,
            value: index.base_stat,
            minValue: minValue,
            maxValue: maxValue,
            percentage: parseFloat(((index.base_stat * 100) / 255).toFixed(2)),
        }
    })

    const eggGroups = pokemonSpecieData.egg_groups.map((index): EggGroups => {
        return {
            name: capitalizeText(index.name),
        }
    })

    let evoChain: EvolutionChain[] = [];
    let evoData = evolutionChainData.chain;

    do {
        let numberOfEvolutions = evoData['evolves_to'].length;

        const pokeSpecieEvo = await api.get(`/pokemon-species/${evoData.species.name}`)
            .then(res => res.data)

        let itemName = !evoData.evolution_details[0] ? null : evoData.evolution_details[0].item?.name.replace(/-/g, ' ') || null

        let imageItemName = !evoData.evolution_details[0] ? null : evoData.evolution_details[0].item?.name || null

        evoChain.push({
            id: pokeSpecieEvo.id,
            idAsString: ('000' + pokeSpecieEvo.id).slice(-3),
            name: capitalizeText(evoData.species.name.replace(/-/g, ' ')),
            nameLowerCase: evoData.species.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeSpecieEvo.id}.png`,
            minLevel: !evoData.evolution_details[0] ? 1 : evoData.evolution_details[0].min_level,
            triggerName: !evoData.evolution_details[0] ? null : evoData.evolution_details[0].trigger.name,
            item: capitalizeText(itemName),
            imageItem: !imageItemName ? null : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${imageItemName}.png`,
            evolvesFrom: !pokeSpecieEvo.evolves_from_species ? null : pokeSpecieEvo.evolves_from_species.name,
        });

        if (numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) {
                let pokeSpecieEvo = await api.get(`/pokemon-species/${evoData.evolves_to[i].species.name}`)
                    .then(res => res.data)

                let itemName = !evoData.evolves_to[i].evolution_details[0] ? null : evoData.evolves_to[i].evolution_details[0].item?.name.replace(/-/g, ' ') || null

                let imageItemName = !evoData.evolves_to[i].evolution_details[0] ? null : evoData.evolves_to[i].evolution_details[0].item?.name || null

                evoChain.push({
                    id: pokeSpecieEvo.id,
                    idAsString: ('000' + pokeSpecieEvo.id).slice(-3),
                    name: capitalizeText(evoData.evolves_to[i].species.name),
                    nameLowerCase: evoData.evolves_to[i].species.name,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeSpecieEvo.id}.png`,
                    minLevel: !evoData.evolves_to[i].evolution_details[0] ? 1 : evoData.evolves_to[i].evolution_details[0].min_level,
                    triggerName: !evoData.evolves_to[i].evolution_details[0] ? null : evoData.evolves_to[i].evolution_details[0].trigger.name,
                    item: capitalizeText(itemName),
                    imageItem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${imageItemName}.png`,
                    evolvesFrom: !pokeSpecieEvo.evolves_from_species ? null : pokeSpecieEvo.evolves_from_species.name,
                });
            }
        }

        evoData = evoData.evolves_to[0];

    } while (evoData != undefined && evoData.hasOwnProperty('evolves_to'));

    const pokemon: Pokemon = {
        id: pokemonData.id,
        idAsString: ('000' + pokemonData.id).slice(-3),
        name: capitalizeText(pokemonData.name.replace(/-/g, ' ')),
        image: pokemonData.sprites.other["official-artwork"].front_default || pokemonData.sprites.front_default,
        description: flavorTextEntries.flavor_text,
        types: types,
        abilities: abilities,
        stats: stats,
        eggGroups: eggGroups,
        femaleRatio: (pokemonSpecieData.gender_rate * 100) / 8,
        maleRatio: 100 - (pokemonSpecieData.gender_rate * 100) / 8,
        catchRate: pokemonSpecieData.capture_rate,
        baseFriendship: pokemonSpecieData.base_happiness,
        height: pokemonData.height / 10, //Convert to 'm'
        weight: pokemonData.weight / 10, //Convert to 'kg'
        evolutionChain: evoChain,
    }

    return {
        props: {
            pokemon
        }
    }
}