import { ReactNode} from 'react';

export type Theme = "pastel" | "dracula";

export interface ThemeContextType {
    theme: Theme ;
    toggleTheme: () => void
}

export interface ThemeProviderType {
    children: ReactNode ;
}