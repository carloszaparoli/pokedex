import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.scss'

import logo from '../../../public/images/logo.svg'

export function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">
                <a>
                    <Image src={logo}/>
                </a>
            </Link>
        </header>
    )
}