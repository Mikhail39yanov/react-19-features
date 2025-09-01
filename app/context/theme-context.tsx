"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

// Создаем контекст
const ThemeContext = createContext<ThemeContextType | null>(null)

// Хук для использования контекста
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme должен использоваться внутри ThemeProvider")
  }
  return context
}

// Провайдер контекста
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  // В React 19 можно использовать сам контекст как компонент
  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}

