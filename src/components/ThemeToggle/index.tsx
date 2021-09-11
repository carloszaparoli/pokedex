import { useTheme } from "next-themes";
import { Icon } from "../Icon";

import styles from './styles.module.scss'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const inactiveTheme = theme === "light" ? "dark" : "light";

    return (
        <button 
            className={`${styles.themeToggle} ${styles[theme]}`}
            type="button" 
            onClick={() => setTheme(inactiveTheme)}
            title={theme == "dark" ? 'Light Mode' : 'Dark Mode'}
        >
            {theme == "dark"
                ? <Icon iconName="sun" />
                : <Icon iconName="moon" />
            }
        </button>
    )
}