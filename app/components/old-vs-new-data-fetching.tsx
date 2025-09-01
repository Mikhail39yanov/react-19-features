"use client"

import { useState, useEffect } from "react"

// Типы данных
interface Post {
  id: number
  title: string
  body: string
}

// Компонент с традиционным подходом (React 18 и ранее)
function OldApproach() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        // Имитируем задержку сети
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Имитируем данные с API
        const mockData = [
          {
            id: 1,
            title: "Традиционный подход к загрузке данных",
            body: "В React 18 и ранее мы использовали useEffect для загрузки данных после монтирования компонента...",
          },
          {
            id: 2,
            title: "Управление состоянием загрузки",
            body: "Нам приходится вручную управлять состоянием загрузки, ошибками и результатом запроса...",
          },
          {
            id: 3,
            title: "Условный рендеринг",
            body: "На основе состояния загрузки и ошибок мы делаем условный рендеринг разных частей интерфейса...",
          },
        ]

        setPosts(mockData)
      } catch (err) {
        setError("Произошла ошибка при загрузке данных")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="text-center p-4">Загрузка данных...</div>
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded-md">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.body.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  )
}

// Имитация нового подхода (React 19)
function NewApproach() {
  // Имитируем данные, которые были бы получены через use(postsPromise)
  const posts: Post[] = [
    {
      id: 1,
      title: "Новый подход к загрузке данных в React 19",
      body: "React 19 представляет новый хук use, который позволяет читать значения промисов прямо в рендере компонента...",
    },
    {
      id: 2,
      title: "Преимущества декларативного подхода",
      body: "Декларативный подход к загрузке данных с хуком use делает код более читаемым и понятным...",
    },
    {
      id: 3,
      title: "Интеграция с Suspense",
      body: "Хук use отлично работает с Suspense, что позволяет создавать более отзывчивые интерфейсы...",
    },
  ]

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded-md">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.body.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  )
}

// Главный компонент сравнения
export default function OldVsNewDataFetching() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">React 18: useEffect + useState</h2>
        <OldApproach />

        <div className="mt-6 p-4 bg-gray-50 rounded-md text-sm">
          <p className="font-medium mb-2">Особенности:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Ручное управление состоянием загрузки</li>
            <li>Ручная обработка ошибок</li>
            <li>Условный рендеринг на основе состояния</li>
            <li>Больше шаблонного кода</li>
            <li>Загрузка данных после монтирования компонента</li>
          </ul>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">React 19: use + Suspense</h2>
        <NewApproach />

        <div className="mt-6 p-4 bg-gray-50 rounded-md text-sm">
          <p className="font-medium mb-2">Особенности:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Декларативный подход к загрузке данных</li>
            <li>Автоматическая приостановка рендера</li>
            <li>Обработка ошибок через Error Boundary</li>
            <li>Меньше шаблонного кода</li>
            <li>Загрузка данных может начаться раньше</li>
            <li>Синхронный стиль кода для асинхронных операций</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

