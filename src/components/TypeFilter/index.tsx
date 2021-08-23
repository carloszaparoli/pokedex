import { useState } from "react";
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
            <div className={`${styles[type]} ${selected == type ? styles.selected : ''}`}>
                <Icon iconName={type} width={20} height={20} />
            </div>
            <span>{type}</span>
        </button>
    )
}