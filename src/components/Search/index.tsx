import { useState } from 'react'

import styles from './styles.module.scss'

export function Search() {
    const [search, setSearch] = useState<string>()

    const handleSubmit = (event) => {
        event.preventDefault()
        alert(search)
    }

    return (
        <div className={styles.searchContainer}>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Search pokémon"
                    type="text"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}