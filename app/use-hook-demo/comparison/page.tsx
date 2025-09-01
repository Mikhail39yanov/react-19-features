'use client';

import { DemoTabs } from '@/components/ui/demo-tabs';

export default function UseHookComparison() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Сравнение подходов к загрузке данных</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует разницу между традиционным подходом с useEffect и новым подходом с
        хуком use.
      </p>

      <div className="mb-8">
        <DemoTabs
          example={
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">React 18: useEffect + useState</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((id) => (
                    <div key={id} className="p-4 border rounded-md">
                      <h3 className="font-semibold">Пост #{id} с традиционным подходом</h3>
                      <p className="text-gray-600 mt-2">
                        Этот пост загружен с использованием useEffect и useState. Требуется явное
                        управление состоянием загрузки и обработка ошибок.
                      </p>
                    </div>
                  ))}
                </div>

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
                <div className="space-y-4">
                  {[1, 2, 3].map((id) => (
                    <div key={id} className="p-4 border rounded-md">
                      <h3 className="font-semibold">Пост #{id} с новым подходом</h3>
                      <p className="text-gray-600 mt-2">
                        Этот пост загружен с использованием хука use. Код более декларативный, без
                        явного управления состоянием загрузки.
                      </p>
                    </div>
                  ))}
                </div>

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
          }
          description={
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Сравнение подходов к загрузке данных</h2>
                <p className="text-gray-700 mb-4">
                  В этом примере мы сравниваем два подхода к загрузке данных в React:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    <strong>React 18 и ранее</strong>: useEffect + useState для загрузки данных
                    после монтирования компонента
                  </li>
                  <li>
                    <strong>React 19</strong>: хук use + Suspense для декларативной загрузки данных
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Традиционный подход (useEffect)</h3>
                <p className="text-gray-700">
                  В традиционном подходе мы используем useEffect для запуска загрузки данных после
                  монтирования компонента. Мы также должны вручную управлять состоянием загрузки,
                  ошибками и результатом.
                </p>
                <p className="text-gray-700">
                  Этот подход требует много шаблонного кода и условного рендеринга на основе
                  состояния.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Новый подход (use + Suspense)</h3>
                <p className="text-gray-700">
                  В новом подходе с хуком use мы можем "читать" значение промиса прямо в рендере
                  компонента. React автоматически приостановит рендер компонента, пока данные не
                  будут загружены.
                </p>
                <p className="text-gray-700">
                  Этот подход более декларативный, требует меньше шаблонного кода и позволяет писать
                  асинхронный код в синхронном стиле.
                </p>
              </div>
            </div>
          }
          code={
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Традиционный подход (React 18)</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`function OldApproach() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError('Произошла ошибка при загрузке данных')
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
      {posts.map(post => (
        <div key={post.id} className="p-4 border rounded-md">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.body.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  )
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Новый подход (React 19)</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// Кэшированный промис для нового подхода
const postsPromise = fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
  })

// Компонент с новым подходом (React 19)
function NewApproach() {
  // Используем хук use для чтения значения промиса
  const posts = use(postsPromise)

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="p-4 border rounded-md">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.body.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  )
}

// Использование с Suspense
function App() {
  return (
    <Suspense fallback={<div className="text-center p-4">Загрузка данных...</div>}>
      <ErrorBoundary fallback={<div className="text-red-600 p-4">Произошла ошибка</div>}>
        <NewApproach />
      </ErrorBoundary>
    </Suspense>
  );
}`}
                </pre>
              </div>
            </div>
          }
        />
      </div>

      <div className="text-center mt-8">
        <a href="/use-hook-demo" className="text-blue-600 hover:text-blue-800">
          ← Вернуться к демонстрации хука use
        </a>
      </div>
    </div>
  );
}
