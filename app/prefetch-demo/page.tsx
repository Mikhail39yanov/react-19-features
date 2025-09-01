"use client"

import PrefetchDemo from "../components/prefetch-demo"
import DemoTabs from "../components/demo-tabs"

export default function PrefetchDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Предварительная загрузка ресурсов</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует новые API React 19 для предварительной загрузки ресурсов.
      </p>

      <div className="mb-8">
        <DemoTabs
          example={<PrefetchDemo />}
          description={
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Предварительная загрузка ресурсов в React 19</h2>
                <p className="text-gray-700 mb-4">
                  React 19 предоставляет API для предварительной загрузки важных ресурсов – чтобы браузер начал их
                  загружать до того, как они понадобятся. Эти функции позволяют добавить в документ специальные
                  &lt;link&gt; подсказки.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Доступные API</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    <strong>prefetchDNS(url)</strong> - вставляет &lt;link rel="dns-prefetch" href="..."&gt;,
                    подсказывая браузеру заранее разрешить DNS-имя указанного хоста.
                  </li>
                  <li>
                    <strong>preconnect(url)</strong> - вставляет &lt;link rel="preconnect" href="..."&gt;, инициируя
                    заранее установление соединения с указанным хостом.
                  </li>
                  <li>
                    <strong>preload(url, options)</strong> - вставляет &lt;link rel="preload" href="..."&gt; для начала
                    загрузки указанного ресурса.
                  </li>
                  <li>
                    <strong>preinit(scriptUrl, options)</strong> - более "агрессивная" форма для скриптов: вставляет тег
                    &lt;script&gt; с атрибутом async.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Преимущества</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Ускорение загрузки критических ресурсов</li>
                  <li>Предотвращение мигания контента (CLS)</li>
                  <li>Оптимизация пользовательского опыта при навигации</li>
                  <li>Автоматическая дедупликация запросов</li>
                  <li>Работает как на сервере, так и на клиенте</li>
                </ul>
              </div>
            </div>
          }
          code={
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Пример использования API предзагрузки</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`import { prefetchDNS, preconnect, preload, preinit } from "react-dom";

function AppRoot() {
  // Предварительно разрешаем DNS-имя и устанавливаем соединение с API-хостом:
  prefetchDNS("https://api.example.com");
  preconnect("https://api.example.com");
  
  // Начинаем заранее загрузку важного шрифта и скрипта аналитики:
  preload("/fonts/Roboto.woff2", { 
    as: "font", 
    type: "font/woff2", 
    crossOrigin: "anonymous" 
  });
  
  preinit("/scripts/analytics.js", { as: "script" });

  return <MainAppContent />;
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Пример предзагрузки при наведении</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`function ProductCard({ product }) {
  // Предзагрузка изображения продукта при наведении
  function handleMouseEnter() {
    preload(product.imageUrl, { as: "image" });
  }
  
  return (
    <div 
      className="product-card" 
      onMouseEnter={handleMouseEnter}
    >
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <a href={\`/products/\${product.id}\`}>
        Подробнее
      </a>
    </div>
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

