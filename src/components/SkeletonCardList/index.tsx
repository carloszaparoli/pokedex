import { useTheme } from "next-themes";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { usePokemon } from "../../contexts/PokemonContext";

import styles from "./styles.module.scss"

export default function SkeletonCardList() {
    const { theme } = useTheme()
    const { filterMode } = usePokemon()
    return (
        <>
            {filterMode &&
                <SkeletonTheme
                    color={theme == "dark" ? '#343D64' : '#E4E4E4'}
                    highlightColor={theme == "dark" ? '#2F375A' : '#D8D8D8'}
                >
                    <div className={styles.resultFilterList}>
                        <Skeleton width={258} height={19} />
                        <Skeleton width={85} height={19} />
                    </div>
                </SkeletonTheme>
            }
            <SkeletonTheme
                color={theme == "dark" ? '#4B547E' : '#EDEDED'}
                highlightColor={theme == "dark" ? '#424b70' : '#E0E0E0'}
            >
                <ul className={styles.skeletonCardList}>
                    {Array.apply(null, new Array(15)).map((item, index) => (
                        <li key={index}>
                            <div>
                                <Skeleton width={32} height={17} />
                                <Skeleton width={109} height={29} />
                                <div>
                                    <Skeleton width={64} height={22} />
                                    <Skeleton width={64} height={22} />
                                </div>
                            </div>
                            <Skeleton circle={true} width={60} height={60} />
                        </li>
                    ))}
                </ul>
            </SkeletonTheme>
        </>
    )
}