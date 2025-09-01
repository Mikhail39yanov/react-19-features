"use client"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Демонстрация возможностей React 19</h1>
        <p className="text-xl text-gray-600 mb-8">Изучите новые функции React 19 с практическими примерами</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          <a
            href="/actions-demo"
            className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">Actions</h2>
            <p>Демонстрация useActionState и обработки форм</p>
          </a>

          <a
            href="/optimistic-demo"
            className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">Оптимистичные обновления</h2>
            <p>Демонстрация useOptimistic</p>
          </a>

          <a
            href="/use-hook-demo"
            className="bg-purple-600 text-white p-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">Хук use</h2>
            <p>Работа с асинхронными данными и сравнение подходов</p>
          </a>

          <a
            href="/context-ref-demo"
            className="bg-yellow-600 text-white p-6 rounded-lg shadow-md hover:bg-yellow-700 transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">Context и Ref</h2>
            <p>Улучшения в работе с контекстом и рефами</p>
          </a>

          <a
            href="/metadata-demo"
            className="bg-red-600 text-white p-6 rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">Метаданные документа</h2>
            <p>Управление title, meta и другими тегами</p>
          </a>

          <a
            href="/resources-demo"
            className="bg-indigo-600 text-white p-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">Стили и скрипты</h2>
            <p>Загрузка и управление внешними ресурсами</p>
          </a>

          <a
            href="/prefetch-demo"
            className="bg-pink-600 text-white p-6 rounded-lg shadow-md hover:bg-pink-700 transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">Предзагрузка ресурсов</h2>
            <p>prefetch, preload, preinit и другие API</p>
          </a>

          <a
            href="/ssr-demo"
            className="bg-orange-600 text-white p-6 rounded-lg shadow-md hover:bg-orange-700 transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">SSR и стриминг</h2>
            <p>Улучшения серверного рендеринга</p>
          </a>

          <a
            href="/error-handling-demo"
            className="bg-gray-700 text-white p-6 rounded-lg shadow-md hover:bg-gray-800 transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">Обработка ошибок</h2>
            <p>Улучшения в обработке �� отображении ошибок</p>
          </a>
        </div>
      </div>
    </div>
  )
}
