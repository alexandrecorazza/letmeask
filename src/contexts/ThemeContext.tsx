import { ReactNode, useState } from "react";
import { createContext } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";

type ThemeContextProps = {
  children: ReactNode
}

type ThemeContextProviderProps = {
  theme: string
  toggleTheme: () => void,
}

export const ThemeContext = createContext({} as ThemeContextProviderProps)

export function ThemeContextProvider(props: ThemeContextProps) {
  const[theme, setTheme] = useState('light')

  function toggleTheme() {
    if(theme === 'light')
      setTheme('dark')
    else
      setTheme('light')
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}