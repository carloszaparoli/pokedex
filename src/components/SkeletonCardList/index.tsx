import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styles from "./styles.module.scss"

export function SkeletonCardList() {
    let amountCard = new Array(15)

    return (
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
    )
}