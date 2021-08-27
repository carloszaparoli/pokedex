import Link from "next/link"
import Image from 'next/image'
import { Icon } from "../Icon"
import styles from "./styles.module.scss"

type PokemonCardProps = {
    pokemon: Pokemon;
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

export function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <li className={styles.pokemon}>
            <Link href={'pokemon/' + pokemon.nameLowerCase}>
                <a className={styles[pokemon.types[0].name]}>
                    <div>
                        <Icon iconName="pattern" className={styles.patternIcon} />
                        <span className={styles.number}>#{pokemon.idAsString}</span>
                        <h3 className={styles.name}>{pokemon.name}</h3>
                        <ul className={styles.typeList}>
                            {pokemon.types.map(type => (
                                <li key={type.name} className={styles[type.name]}>
                                    <Icon iconName={type.name} />
                                    {type.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.image}>
                        <Image src={pokemon.image as any}
                            width={130}
                            height={130}
                            alt={pokemon.name}                            
                            objectFit="initial" />
                    </div>
                </a>
            </Link>
        </li>
    )
}