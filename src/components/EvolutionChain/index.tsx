import Link from "next/link"
import { Icon } from "../Icon"

import styles from './styles.module.scss'

type Pokemon = {
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

type EvolutionChainProps = {
    evolutionChain: Pokemon[]
}

export function EvolutionChain({ evolutionChain }: EvolutionChainProps) {

    let evolutions = []

    if (evolutionChain.length > 1) {
        for (let i = 0; i < evolutionChain.length; i++) {
            for (let j = 0; j < evolutionChain.length; j++) {
                if (evolutionChain[i].nameLowerCase == evolutionChain[j].evolvesFrom) {
                    let evolution = [evolutionChain[i], evolutionChain[j]]
                    evolutions.push(evolution)
                }
            }
        }
    }

    return evolutions.length >= 1 ? (
        <ul className={styles.evolutionChainList}>
            {evolutions.map(pokemon => (
                <li key={pokemon[0].nameLowerCase}>
                    <div className={styles.pokemon}>
                        <img src="/images/pokeball-grey-gradient.svg" 
                            className={styles.pokeballImage} 
                            alt="Evolution"
                        />
                        <Link href={'/pokemon/' + pokemon[0].nameLowerCase}>
                            <a>
                                <div className={styles.imageContainer}>
                                    <img src={pokemon[0].image}
                                        alt={pokemon[0].name}
                                        className={styles.image}
                                    />
                                </div>
                                <div>
                                    <span className={styles.number}>#{pokemon[0].idAsString}</span>
                                    <h3 className={styles.name}>{pokemon[0].name}</h3>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.evolvesTo}>
                        <Icon className={styles.arrowImage} iconName="arrow-right" width={20} height={21} />
                        {pokemon[1].minLevel != null &&
                            <span>Level {pokemon[1].minLevel}</span>
                        }
                        {pokemon[1].item != null &&
                            <div className={styles.evolutionItem}>
                                <img src={pokemon[1].imageItem} alt={pokemon[1].item} />
                                <span>{pokemon[1].item}</span>
                            </div>
                        }
                    </div>
                    <div className={styles.pokemon}>
                        <img src="/images/pokeball-grey-gradient.svg" 
                            className={styles.pokeballImage} 
                            alt="Evolution"
                        />
                        <Link href={'/pokemon/' + pokemon[1].nameLowerCase}>
                            <a>
                                <div className={styles.imageContainer}>
                                    <img src={pokemon[1].image}
                                        alt={pokemon[1].name}
                                        className={styles.image}
                                    />
                                </div>
                                <div>
                                    <span className={styles.number}>#{pokemon[1].idAsString}</span>
                                    <h3 className={styles.name}>{pokemon[1].name}</h3>
                                </div>
                            </a>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    )
        :
        (
            <p>This Pokemon does not evolve.</p>
        )
}