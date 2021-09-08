import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { usePokemon } from "../../contexts/PokemonContext";

import styles from "./styles.module.scss"

export function SkeletonCardList() {

    const { filterMode } = usePokemon()
    
    return (
        <>
            {filterMode &&
                <SkeletonTheme color="#e4e4e4" highlightColor="#d8d8d8">
                    <div className={styles.resultFilterList}>
                        <Skeleton width={258} height={19} />
                        <Skeleton width={85} height={19} />
                    </div>
                </SkeletonTheme>
            }
            <SkeletonTheme color="#EDEDED" highlightColor="#E0E0E0">
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