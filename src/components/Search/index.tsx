import { ChangeEventHandler, FormEvent, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Icon } from '../Icon'

import styles from './styles.module.scss'

type SearchProps = {
    onSearch: (text: string) => void;
}

export function Search({ onSearch }: SearchProps) {
    const [search, setSearch] = useState<string>('')

    const searchInput = useRef(null)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()

        if (search.length > 0 && search.length < 3) {
            toast.warning("Enter at least 3 characters to search.")
        } else {
            onSearch(search)
            searchInput.current.blur()
        }
    }

    return (
        <div className={styles.searchContainer}>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Search your pokémon"
                    type="text"
                    value={search}
                    ref={searchInput}
                    onChange={event => setSearch(event.target.value)}
                />
                <button type="submit">
                    <Icon iconName="pokeball" />
                </button>
            </form>
        </div>
    )
}