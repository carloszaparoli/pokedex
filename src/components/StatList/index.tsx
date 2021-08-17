
import styles from './styles.module.scss'

type Stat = {
    name: string;
    value: number;
    minValue: number;
    maxValue: number;
    percentage: number;
}

type StatListProps = {
    stats: Stat[];
    pokemonType: string;
}

export function StatList({ stats, pokemonType  }: StatListProps) {

    let totalStats = 0

    stats.map(stat => totalStats = totalStats + stat.value)

    return (
        <>
            <table className={styles.statsTable}>
                <tbody>
                    {stats.map(stat => (
                        <tr key={stat.name}>
                            <td>{stat.name}</td>
                            <td>{stat.value}</td>
                            <td className={styles.columnStatProgressBar}>
                                <div className={styles.progressBar}>
                                    <div className={`${styles.progressBarValue} ${styles[pokemonType]}`} style={{ width: stat.percentage + '%' }}></div>
                                </div>
                            </td>
                            <td className={styles.columnStatValue}>{stat.minValue}</td>
                            <td className={styles.columnStatValue}>{stat.maxValue}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td>{totalStats}</td>
                        <td></td>
                        <td>Min</td>
                        <td>Max</td>
                    </tr>
                </tfoot>
            </table>
            <p className={styles.infoText}>The ranges shown on the top are for a level 100 Pokémon. Maximum values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, 0 EVs, 0 IVs.</p>
        </>
    )
}