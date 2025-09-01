"use client"

import { createContext, useContext, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

// Создаем контекст
const ThemeContext = createContext<ThemeContextType | null>(null)

// Хук для использования контекста
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme должен использоваться внутри ThemeProvider")
  }
  return context
}

// Компонент для демонстрации использования контекста
function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <h3 className="text-xl font-bold mb-4">Текущая тема: {theme}</h3>
      <p className="mb-4">Этот компонент использует контекст темы для отображения соответствующих стилей.</p>
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded-md ${
          theme === "dark" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Переключить тему
      </button>
    </div>
  )
}

// Главный компонент демонстрации
export default function ThemeDemo() {
  const [theme, setTheme] = useState<Theme>("light")

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return (
    <div className="max-w-md mx-auto">
      {/* В React 19 можно использовать сам контекст как компонент */}
      <ThemeContext value={{ theme, toggleTheme }}>
        <ThemeConsumer />

        <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">О новом синтаксисе Context</h3>
          <p className="text-sm text-gray-700">
            В React 19 можно использовать сам объект контекста как JSX-компонент, вместо Context.Provider.
          </p>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold mb-1">До React 19:</h4>
              <pre className="p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                {`<ThemeContext.Provider value={value}>
  {children}
</ThemeContext.Provider>`}
              </pre>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-1">С React 19:</h4>
              <pre className="p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                {`<ThemeContext value={value}>
  {children}
</ThemeContext>`}
              </pre>
            </div>
          </div>
        </div>
      </ThemeContext>
    </div>
  )
}

