import { useEffect, useState, createContext } from "react"
import { Theme, ThemeContextType, ThemeProviderType } from "../types/ThemeTypes"

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC <ThemeProviderType>= ({children}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem("theme") as Theme) || "dracula";
    });

    useEffect(()=>{
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme)
    },[theme]);

    const toggleTheme = ():void => {
        setTheme((prev) => prev === "dracula" ? "pastel":"dracula");
    }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}
