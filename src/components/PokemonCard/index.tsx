import Link from "next/link"
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
                        <img src="/images/pattern.svg" className={styles.patternImage} alt="pattern" />
                        <span className={styles.number}>#{pokemon.idAsString}</span>
                        <h3 className={styles.name}>{pokemon.name}</h3>
                        <ul className={styles.typeList}>
                            {pokemon.types.map(type => (
                                <li key={type.name} className={styles[type.name]}>
                                    <Icon iconName={type.name} width={12} height={12}/>
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
    )
}