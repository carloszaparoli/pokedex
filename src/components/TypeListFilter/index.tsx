import { useState } from 'react'
import { usePokemon } from '../../contexts/PokemonContext'
import { TypeFilter } from '../TypeFilter'
import styles from './styles.module.scss'

type TypeListFilterProps = {
    onFilter: (type: string) => void
}

export function TypeListFilter({ onFilter }: TypeListFilterProps) {
    let types = [
        "Bug", "Dark", "Electric", "Fairy", "Fighting", "Dragon",
        "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice",
        "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"
    ]

    const { selectedType, setSelectedType } = usePokemon()

    function selectType(type: string) {
        if (selectedType == type) {
            setSelectedType("")
            onFilter("")
        } else {
            setSelectedType(type)
            onFilter(type)
        }
    }

    return (
        <div className={styles.scrollList}>
            <ul className={styles.typeFilterList}>
                {types.map(type => (
                    <div key={type}>
                        <TypeFilter type={type} selected={selectedType} onSelect={selectType} />
                    </div>
                ))}
            </ul>
        </div>
    )
}