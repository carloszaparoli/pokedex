import { ChangeEventHandler, Dispatch, FormEvent, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { usePokemon } from '../../contexts/PokemonContext'
import { Icon } from '../Icon'

import styles from './styles.module.scss'

type SearchProps = {
    onSearch: (text: string) => void;
}

export function Search({ onSearch }: SearchProps) {
    
    const { searchText, setSearchText } = usePokemon()
    const searchInput = useRef(null)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()

        if (searchText.length > 0 && searchText.length < 3) {
            toast.warning("Enter at least 3 characters to search.")
        } else {
            onSearch(searchText)
            searchInput.current.blur()
        }
    }

    return (
        <div className={styles.searchContainer}>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Search your pokémon"
                    type="text"
                    value={searchText}
                    ref={searchInput}
                    onChange={event => setSearchText(event.target.value)}
                />
                <button type="submit">
                    <Icon iconName="pokeball" />
                </button>
            </form>
        </div>
    )
}