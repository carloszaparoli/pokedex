import { Icon } from "../Icon";

import styles from './styles.module.scss'

type TypeFilterProps = {
    type: string;
    selected: string;
    onSelect: (type: string) => void;
}

export function TypeFilter({ type, selected, onSelect }: TypeFilterProps) {
    return (
        <button type="button" className={`${styles.typeFilter} ${styles[type]} ${selected == type ? styles.selected : ''}`} onClick={() => onSelect(type)}>
            <div>
                <Icon iconName={type} />
            </div>
            <span>{type}</span>
        </button>
    )
}