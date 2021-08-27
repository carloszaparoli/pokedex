import Link from 'next/link'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">
                <a>
                    <img src="/images/logo.svg" alt="Pokémon"/>
                </a>
            </Link>
        </header>
    )
}