import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.header}>
            <img src="/images/logo.svg" alt="Pokémon" width={150} />
        </header>
    )
}