import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

const ThemeSwitcher: React.FC = () => {
    const themeContext = useContext(ThemeContext)!;
    
    const { theme, toggleTheme } = themeContext;

    return (
        <button className="btn btn-active" onClick={toggleTheme}>
            {theme}
        </button>
    );
};

export default ThemeSwitcher;