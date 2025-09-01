"use client"

import type React from "react"

import { createContext, useContext, useState, useRef, forwardRef } from "react"

export default function ContextRefDemo() {
  const [activeTab, setActiveTab] = useState<"context" | "ref">("context")

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 ${activeTab === "context" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("context")}
          >
            Context API
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "ref" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("ref")}
          >
            Ref API
          </button>
        </div>

        {activeTab === "context" ? <ContextDemo /> : <RefDemo />}
      </div>
    </div>
  )
}

// Демонстрация улучшений Context
function ContextDemo() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Улучшения Context API</h2>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 18 и ранее:</h3>
          <div className="p-3 bg-gray-100 rounded text-xs mb-4">
            <pre className="whitespace-pre-wrap">
              {`// Создание контекста
const ThemeContext = createContext("light");

// Использование Provider
<ThemeContext.Provider value="dark">
  {children}
</ThemeContext.Provider>`}
            </pre>
          </div>
          <OldContextExample />
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 19:</h3>
          <div className="p-3 bg-gray-100 rounded text-xs mb-4">
            <pre className="whitespace-pre-wrap">
              {`// Создание контекста
const ThemeContext = createContext("light");

// Использование контекста как компонента
<ThemeContext value="dark">
  {children}
</ThemeContext>`}
            </pre>
          </div>
          <NewContextExample />
        </div>
      </div>

      <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold mb-3">Преимущества нового синтаксиса:</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Более лаконичный и читаемый код</li>
          <li>Меньше шаблонного кода</li>
          <li>Более естественный синтаксис</li>
          <li>Легче рефакторить</li>
          <li>Будущая совместимость (старый синтаксис будет устаревшим)</li>
        </ul>
      </div>
    </div>
  )
}

// Старый подход к контексту
function OldContextExample() {
  // Создаем контекст
  const ThemeContext = createContext<string>("light")

  // Компонент, использующий контекст
  function ThemedButton() {
    const theme = useContext(ThemeContext)
    return (
      <button
        className={`px-4 py-2 rounded ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}
      >
        Тема: {theme}
      </button>
    )
  }

  // Демонстрация
  const [theme, setTheme] = useState<"light" | "dark">("light")

  return (
    <div className="p-4 border border-dashed border-gray-300 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm">
          Текущая тема: <b>{theme}</b>
        </span>
        <button
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
        >
          Переключить
        </button>
      </div>

      <ThemeContext.Provider value={theme}>
        <div className="flex justify-center">
          <ThemedButton />
        </div>
      </ThemeContext.Provider>
    </div>
  )
}

// Новый подход к контексту
function NewContextExample() {
  // Создаем контекст
  const ThemeContext = createContext<string>("light")

  // Компонент, использующий контекст
  function ThemedButton() {
    const theme = useContext(ThemeContext)
    return (
      <button
        className={`px-4 py-2 rounded ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}
      >
        Тема: {theme}
      </button>
    )
  }

  // Демонстрация
  const [theme, setTheme] = useState<"light" | "dark">("light")

  return (
    <div className="p-4 border border-dashed border-gray-300 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm">
          Текущая тема: <b>{theme}</b>
        </span>
        <button
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
        >
          Переключить
        </button>
      </div>

      <ThemeContext value={theme}>
        <div className="flex justify-center">
          <ThemedButton />
        </div>
      </ThemeContext>
    </div>
  )
}

// Демонстрация улучшений Ref
function RefDemo() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Улучшения Ref API</h2>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 18 и ранее:</h3>
          <div className="p-3 bg-gray-100 rounded text-xs mb-4">
            <pre className="whitespace-pre-wrap">
              {`// Необходимо использовать forwardRef
const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Использование
const inputRef = useRef(null);
<MyInput ref={inputRef} />`}
            </pre>
          </div>
          <OldRefExample />
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 19:</h3>
          <div className="p-3 bg-gray-100 rounded text-xs mb-4">
            <pre className="whitespace-pre-wrap">
              {`// Можно принимать ref напрямую
function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// Использование
const inputRef = useRef(null);
<MyInput ref={inputRef} />`}
            </pre>
          </div>
          <NewRefExample />
        </div>
      </div>

      <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold mb-3">Преимущества нового подхода:</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Не нужно оборачивать компонент в forwardRef</li>
          <li>Более интуитивный синтаксис</li>
          <li>Меньше шаблонного кода</li>
          <li>Легче типизировать в TypeScript</li>
          <li>Более последовательный API</li>
        </ul>
      </div>
    </div>
  )
}

// Старый подход к рефам
function OldRefExample() {
  // Создаем компонент с forwardRef
  const OldInput = forwardRef<HTMLInputElement, { placeholder?: string }>(({ placeholder }, ref) => {
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    )
  })

  // Демонстрация
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")

  function handleFocus() {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  function handleGetValue() {
    if (inputRef.current) {
      setValue(inputRef.current.value)
    }
  }

  return (
    <div className="p-4 border border-dashed border-gray-300 rounded-md">
      <div className="flex mb-4">
        <OldInput ref={inputRef} placeholder="Введите текст" />
      </div>

      <div className="flex space-x-2">
        <button onClick={handleFocus} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
          Фокус
        </button>
        <button onClick={handleGetValue} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
          Получить значение
        </button>
      </div>

      {value && (
        <div className="mt-2 text-sm">
          Значение: <b>{value}</b>
        </div>
      )}
    </div>
  )
}

// Новый подход к рефам
function NewRefExample() {
  // Создаем компонент с прямым ref
  function NewInput({
    placeholder,
    ref,
  }: {
    placeholder?: string
    ref?: React.Ref<HTMLInputElement>
  }) {
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    )
  }

  // Демонстрация
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")

  function handleFocus() {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  function handleGetValue() {
    if (inputRef.current) {
      setValue(inputRef.current.value)
    }
  }

  return (
    <div className="p-4 border border-dashed border-gray-300 rounded-md">
      <div className="flex mb-4">
        <NewInput ref={inputRef} placeholder="Введите текст" />
      </div>

      <div className="flex space-x-2">
        <button onClick={handleFocus} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
          Фокус
        </button>
        <button onClick={handleGetValue} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
          Получить значение
        </button>
      </div>

      {value && (
        <div className="mt-2 text-sm">
          Значение: <b>{value}</b>
        </div>
      )}
    </div>
  )
}

