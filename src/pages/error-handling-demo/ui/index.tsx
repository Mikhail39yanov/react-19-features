import { DemoTabs } from '@/src/shrared/ui/demo-tabs';
import { ErrorHandlingDemo } from './error-handling-demo';

export const ErrorHandlingDemoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Улучшения обработки ошибок</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует улучшения в обработке ошибок в React 19.
      </p>

      <div className="mb-8">
        <DemoTabs
          example={<ErrorHandlingDemo />}
          description={
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Улучшения обработки ошибок в React 19</h2>
                <p className="text-gray-700 mb-4">
                  React 19 значительно улучшил обработку ошибок, особенно в контексте гидратации и
                  серверного рендеринга.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Ключевые улучшения</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    <strong>Устойчивость к внешним изменениям DOM</strong> - React игнорирует лишние
                    узлы, вставленные сторонними скриптами или расширениями браузера.
                  </li>
                  <li>
                    <strong>Информативные сообщения об ошибках</strong> - при несоответствии HTML
                    React выводит подробное сообщение с возможными причинами проблемы.
                  </li>
                  <li>
                    <strong>Единообразное логирование ошибок</strong> - устранено двойное
                    логирование ошибок в режиме разработки.
                  </li>
                  <li>
                    <strong>Улучшенная интеграция с Suspense</strong> - ошибки, возникающие при
                    загрузке данных через Suspense, корректно перехватываются Error Boundary.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Error Boundary</h3>
                <p className="text-gray-700">
                  Error Boundary - это компонент React, который перехватывает ошибки JavaScript в
                  дочернем дереве компонентов, логирует их и отображает запасной UI вместо упавшего
                  дерева компонентов.
                </p>
                <p className="text-gray-700">
                  В React 19 улучшена интеграция Error Boundary с Suspense и асинхронным
                  рендерингом. Теперь ошибки в асинхронном коде (например, при загрузке данных)
                  корректно перехватываются.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Применение</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Обработка ошибок при загрузке данных</li>
                  <li>Предотвращение падения всего приложения из-за ошибки в одном компоненте</li>
                  <li>Отображение пользовательских сообщений об ошибках</li>
                  <li>Логирование ошибок для отладки</li>
                  <li>Автоматическое восстановление после ошибок</li>
                  <li>Обработка ошибок в асинхронном коде</li>
                </ul>
              </div>
            </div>
          }
          code={
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Пример использования Error Boundary</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`import { ErrorBoundary } from 'react-error-boundary';

function MyComponent() {
  return (
    <ErrorBoundary
      fallback={<div>Что-то пошло не так. Пожалуйста, попробуйте позже.</div>}
      onError={(error, info) => {
        // Логирование ошибки
        console.error('Ошибка в компоненте:', error);
        console.error('Информация о компоненте:', info);
      }}
    >
      <ComponentThatMightThrow />
    </ErrorBoundary>
  );
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Интеграция с Suspense</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`function DataComponent() {
  // Этот компонент может выбросить Promise (Suspense)
  // или ошибку при загрузке данных
  const data = use(fetchData());
  return <div>{data}</div>;
}

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Loading />}>
        <DataComponent />
      </Suspense>
    </ErrorBoundary>
  );
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
