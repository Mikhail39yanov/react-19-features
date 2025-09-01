"use client"

import { useState, useEffect } from "react"

// Имитация API для получения данных
const fetchData = (delay = 1500) => {
  return new Promise<{ id: number; title: string; content: string }[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Что такое React 19?",
          content: "React 19 - это новая версия библиотеки React с множеством улучшений...",
        },
        {
          id: 2,
          title: "Хук use",
          content: "Хук use позволяет читать значения промисов прямо в рендере компонента...",
        },
        {
          id: 3,
          title: "Suspense и Error Boundary",
          content: "Suspense позволяет показывать запасной UI во время загрузки данных...",
        },
      ])
    }, delay)
  })
}

export default function InteractiveUseDemo() {
  const [activeTab, setActiveTab] = useState<"traditional" | "modern">("traditional")

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Интерактивная демонстрация</h2>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 ${activeTab === "traditional" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("traditional")}
        >
          Традиционный подход
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "modern" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("modern")}
        >
          Подход с use (имитация)
        </button>
      </div>

      {activeTab === "traditional" ? <TraditionalApproach /> : <ModernApproach />}
    </div>
  )
}

// Компонент с традиционным подходом (React 18)
function TraditionalApproach() {
  const [posts, setPosts] = useState<{ id: number; title: string; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [buttonClicked, setButtonClicked] = useState(false)

  useEffect(() => {
    if (!buttonClicked) return

    async function loadData() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchData()
        setPosts(data)
      } catch (err) {
        setError("Произошла ошибка при загрузке данных")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [buttonClicked])

  return (
    <div>
      <div className="mb-4 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">React 18: useEffect + useState</h3>
        <p className="text-sm text-gray-600 mb-4">
          В традиционном подходе мы используем useEffect для запуска загрузки данных и useState для управления
          состоянием загрузки.
        </p>
        <button
          onClick={() => setButtonClicked(true)}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Загрузка..." : "Загрузить данные"}
        </button>
      </div>

      {isLoading && (
        <div className="p-4 bg-gray-100 rounded-md mb-4 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-md">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs">
        <pre className="overflow-x-auto">
          {`// Традиционный подход
function PostsList() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const data = await fetchPosts()
        setPosts(data)
      } catch (err) {
        setError("Ошибка загрузки")
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  if (isLoading) return <Loading />
  if (error) return <Error message={error} />
  
  return <div>{/* Отображение постов */}</div>
}`}
        </pre>
      </div>
    </div>
  )
}

// Компонент, имитирующий подход с use (React 19)
function ModernApproach() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<{ id: number; title: string; content: string }[]>([])

  // Имитация поведения хука use
  useEffect(() => {
    if (!shouldLoad) return

    setIsLoading(true)

    // Имитируем поведение Suspense
    fetchData(1500).then((data) => {
      setPosts(data)
      setIsLoading(false)
    })
  }, [shouldLoad])

  return (
    <div>
      <div className="mb-4 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">React 19: use + Suspense (имитация)</h3>
        <p className="text-sm text-gray-600 mb-4">
          В новом подходе с хуком use мы можем "читать" значение промиса прямо в рендере компонента. React автоматически
          приостановит рендер, пока данные не будут загружены.
        </p>
        {!shouldLoad && (
          <button
            onClick={() => setShouldLoad(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Загрузить данные
          </button>
        )}
      </div>

      {shouldLoad && (
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-2"></div>
                <p className="text-blue-600">Suspense в действии...</p>
              </div>
            </div>
          )}

          <div className={`space-y-4 ${isLoading ? "opacity-25" : ""}`}>
            {posts.map((post) => (
              <div key={post.id} className="p-4 border rounded-md">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.content}</p>
              </div>
            ))}

            {posts.length === 0 && !isLoading && (
              <div className="p-4 border rounded-md">
                <p className="text-gray-600">Данные будут здесь после загрузки</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs">
        <pre className="overflow-x-auto">
          {`// Подход с use в React 19
// Кэшированный промис
const postsPromise = fetchPosts()

// Компонент с use
function PostsList() {
  // Чтение значения промиса
  const posts = use(postsPromise)
  
  return <div>{/* Отображение постов */}</div>
}

// Использование с Suspense
<Suspense fallback={<Loading />}>
  <PostsList />
</Suspense>`}
        </pre>
      </div>
    </div>
  )
}

