import { DemoTabs } from '@/src/shrared/ui/demo-tabs';
import { InteractiveUseDemo } from './interactive-use-demo';

export const UseHookDemoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Демонстрация хука use</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует использование хука use в React 19 для работы с асинхронными
        данными.
      </p>

      <div className="mb-8">
        <DemoTabs
          example={
            <div className="space-y-8">
              <InteractiveUseDemo />

              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Имитация работы хука use</h2>
                <p className="text-gray-600 mb-4">
                  В React 19 будет доступен новый хук use, который позволит "читать" значения
                  промисов прямо в рендере компонента. Это упростит работу с асинхронными данными и
                  сделает код более декларативным.
                </p>

                <div className="grid gap-8 md:grid-cols-2 mt-6">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-semibold mb-2">React 18 (useEffect)</h3>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                      {`function PostsList() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
      setIsLoading(false)
    }
    
    fetchData()
  }, [])
  
  if (isLoading) {
    return <div>Загрузка...</div>
  }
  
  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}`}
                    </pre>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h3 className="font-semibold mb-2">React 19 (use)</h3>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                      {`// Кэшированный промис
const postsPromise = fetch('/api/posts')
  .then(res => res.json())

function PostsList() {
  // Чтение значения промиса
  const posts = use(postsPromise)
  
  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}

// Использование с Suspense
<Suspense fallback={<div>Загрузка...</div>}>
  <PostsList />
</Suspense>`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          }
          description={
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Хук use в React 19</h2>
                <p className="text-gray-700 mb-4">
                  Хук use предоставляет удобный способ "прочитать" асинхронный ресурс (Promise)
                  непосредственно во время рендера компонента.
                </p>
                <p className="text-gray-700">
                  Раньше, чтобы получить данные в компоненте, приходилось либо использовать эффект
                  useEffect и хранить состояние с результатом, либо применять сторонние библиотеки
                  типа React Query. Теперь же можно просто вызвать use(promise) внутри функции
                  компонента.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Как это работает</h3>
                <p className="text-gray-700">
                  Когда вы вызываете use(promise), React увидит, что вы пытаетесь использовать
                  результат асинхронной операции, и приостановит (suspend) рендер этого компонента,
                  пока Promise не завершится. При этом вместо компонента будет отображён ближайший
                  Suspense fallback.
                </p>
                <p className="text-gray-700">
                  Когда Promise выполнится, React автоматически продолжит рендерить компонент, но
                  уже с готовыми данными.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Сравнение подходов</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">React 18 (useEffect)</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Ручное управление состоянием загрузки</li>
                      <li>Ручная обработка ошибок</li>
                      <li>Условный рендеринг на основе состояния</li>
                      <li>Больше шаблонного кода</li>
                      <li>Загрузка данных после монтирования компонента</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">React 19 (use + Suspense)</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Декларативный подход к загрузке данных</li>
                      <li>Автоматическая приостановка рендера</li>
                      <li>Обработка ошибок через Error Boundary</li>
                      <li>Меньше шаблонного кода</li>
                      <li>Синхронный стиль кода для асинхронных операций</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Применение</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Загрузка данных для отображения на странице</li>
                  <li>Работа с API и внешними сервисами</li>
                  <li>Загрузка изображений и медиа-контента</li>
                  <li>Динамическая загрузка компонентов</li>
                  <li>Интеграция с GraphQL и другими источниками данных</li>
                </ul>
              </div>
            </div>
          }
          code={
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Пример использования хука use</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// Этот код будет работать в React 19
'use client'

import { use, Suspense } from "react"

// Кэшированный промис для загрузки данных
const dataPromise = fetch('/api/data')
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
  })

// Компонент, использующий хук use
function DataComponent() {
  // Используем хук use для чтения значения промиса
  const data = use(dataPromise)
  
  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  )
}

// Главный компонент с Suspense
export default function DataPage() {
  return (
    <div>
      <h1>Данные с сервера</h1>
      
      <Suspense fallback={<div>Загрузка данных...</div>}>
        <DataComponent />
      </Suspense>
    </div>
  )
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Использование с контекстом</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// Хук use также можно использовать для чтения контекста
'use client'

import { createContext, use } from "react"

// Создаем контекст
const ThemeContext = createContext("light")

// Компонент, использующий контекст через use
function ThemedButton() {
  // Используем use вместо useContext
  const theme = use(ThemeContext)
  
  return (
    <button className={\`btn \${theme === "dark" ? "btn-dark" : "btn-light"}\`}>
      Кнопка с темой {theme}
    </button>
  )
}

// Использование
export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  )
}`}
                </pre>
              </div>
            </div>
          }
        />
      </div>

      <div className="text-center mt-8">
        <a href="/" className="text-blue-600 hover:text-blue-800">
          ← Вернуться на главную
        </a>
      </div>
    </div>
  );
};
