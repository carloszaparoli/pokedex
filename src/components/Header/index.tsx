import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import styles from './styles.module.scss'

import logoLight from '../../../public/images/logo.svg'
import logoDark from '../../../public/images/logo-dark.svg'

import { useTheme } from 'next-themes'
import { Icon } from '../Icon'

export function Header() {

    const { theme } = useTheme()

    const ThemeToggle = dynamic(() => import("../ThemeToggle") as any, {
        ssr: false,
    });

    return (
        <header className={styles.header}>
            <a
                href="https://github.com/carloszaparoli/pokedex"
                className={styles.github}
                target="_blank"
                title="Github"
            >
                <Icon iconName="github" width={24} height={24} />
            </a>
            <Link href="/">
                <a>
                    {theme == "dark"
                        ? <Image src={logoDark} />
                        : <Image src={logoLight} />
                    }
                </a>
            </Link>
            <ThemeToggle />
        </header>
    )
}