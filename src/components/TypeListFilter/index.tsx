import { useState } from 'react'
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

    const [selected, setSelected] = useState("")

    function selectType(type: string) {
        if (selected == type) {
            setSelected("")
            onFilter("")
        } else {
            setSelected(type)
            onFilter(type.toLowerCase())
        }
    }

    return (
        <div className={styles.scrollList}>
            <ul className={styles.typeFilterList}>
                {types.map(type => (
                    <div key={type}>
                        <TypeFilter type={type} selected={selected} onSelect={selectType} />
                    </div>
                ))}
            </ul>
        </div>
    )
}