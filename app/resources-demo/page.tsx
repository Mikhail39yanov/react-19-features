import ResourcesDemo from "../components/resources-demo"
import DemoTabs from "../../components/ui/demo-tabs"

export default function ResourcesDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Загрузка стилей и скриптов</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует новые возможности React 19 для управления загрузкой ресурсов.
      </p>

      <div className="mb-8">
        <DemoTabs
          example={<ResourcesDemo />}
          description={
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Управление стилями и скриптами в React 19</h2>
                <p className="text-gray-700 mb-4">
                  React 19 внедрил нативную поддержку подключения стилей и скриптов из кода компонентов, что особенно
                  полезно в условиях клиентского Concurrent Rendering и потокового SSR.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Стили: атрибут precedence</h3>
                <p className="text-gray-700">
                  Введён специальный атрибут precedence для &lt;link rel="stylesheet"&gt; (а также для инлайновых
                  &lt;style&gt;), указывающий приоритет данного стиля. React будет учитывать этот приоритет при вставке
                  тегов стиля в DOM.
                </p>
                <p className="text-gray-700">
                  Если такой &lt;link&gt; рендерится внутри Suspense-границы, React обеспечит, что соответствующий
                  CSS-файл загрузится до того, как будет отображён контент, зависящий от него (это предотвращает эффект
                  FOUC – Flash of Unstyled Content).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Скрипты: поддержка async</h3>
                <p className="text-gray-700">
                  React 19 теперь поддерживает рендеринг &lt;script async&gt; внутри компонентов: вы можете вставить тег
                  &lt;script async src="..."&gt; прямо там, где он нужен в JSX, не беспокоясь о его ручном перемещении в
                  &lt;head&gt;.
                </p>
                <p className="text-gray-700">
                  React гарантирует, что такой скрипт будет выполнен только один раз, даже если компонент, его
                  содержащий, будет отрендерен несколько раз. Все дублирующиеся экземпляры &lt;script async src="X"&gt;
                  будут автоматически устранены.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Преимущества нового подхода</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Автоматическая дедупликация ресурсов</li>
                  <li>Правильный порядок загрузки стилей</li>
                  <li>Предотвращение FOUC (мигание нестилизованного контента)</li>
                  <li>Интеграция с Suspense</li>
                  <li>Декларативный подход к управлению ресурсами</li>
                  <li>Работает как на клиенте, так и на сервере</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Применение</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Динамическая загрузка стилей для компонентов</li>
                  <li>Интеграция с аналитикой и сторонними скриптами</li>
                  <li>Управление порядком загрузки стилей</li>
                  <li>Условная загрузка ресурсов</li>
                  <li>Оптимизация производительности</li>
                </ul>
              </div>
            </div>
          }
          code={
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Пример использования precedence для стилей</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// Компонент с базовыми стилями
function BaseStyles() {
  return (
    <>
      <link 
        rel="stylesheet" 
        href="/base.css" 
        precedence="default" 
      />
      <div className="base-container">
        Базовый контент
      </div>
    </>
  );
}

// Компонент с темой, которая должна переопределить базовые стили
function ThemeStyles() {
  return (
    <>
      <link 
        rel="stylesheet" 
        href="/theme.css" 
        precedence="high" 
      />
      <div className="themed-container">
        Контент с темой
      </div>
    </>
  );
}

// Использование
function App() {
  return (
    <>
      <BaseStyles />
      <ThemeStyles />
      {/* Стили theme.css будут иметь приоритет над base.css */}
    </>
  );
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Пример использования скриптов</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// Компонент с аналитикой
function AnalyticsComponent() {
  return (
    <div>
      {/* Скрипт будет автоматически перемещен в <head> */}
      <script 
        async 
        src="https://analytics.example.com/tracker.js" 
      />
      <p>Компонент с аналитикой</p>
    </div>
  );
}

// Компонент с картой
function MapComponent({ location }) {
  return (
    <div className="map-container">
      {/* Даже если этот компонент рендерится несколько раз,
          скрипт будет загружен только один раз */}
      <script 
        async 
        src="https://maps.example.com/api.js" 
      />
      <div>Карта для локации: {location}</div>
    </div>
  );
}

// Использование
function App() {
  return (
    <>
      <AnalyticsComponent />
      <MapComponent location="Москва" />
      <MapComponent location="Санкт-Петербург" />
      {/* Скрипт maps.example.com/api.js будет загружен только один раз */}
    </>
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
  )
}
