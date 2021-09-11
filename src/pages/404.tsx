import Head from "next/head"
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '../components/Icon'

import NotFoundImage from '../../public/images/404.svg'
import NotFoundImageDark from '../../public/images/404-dark.svg'

import styles from './styles/404.module.scss'
import { useTheme } from "next-themes"

export default function Page404() {
    const { theme } = useTheme()

    return (
        <>
            <Head>
                <title>Page not found</title>
            </Head>
            <main className={styles.notFoundContainer}>
                <div>
                    <div className={styles.imageContainer}>
                        {theme == 'dark'
                            ? <Image src={NotFoundImageDark} />
                            : <Image src={NotFoundImage} />
                        }
                    </div>
                    <h1>Page not found</h1>
                    <p>You look lost on your journey!</p>
                    <Link href="/">
                        <button>
                            <Icon iconName="arrow-right" />
                            <span>Go Back Home</span>
                        </button>
                    </Link>
                </div>
            </main>
        </>
    )
}