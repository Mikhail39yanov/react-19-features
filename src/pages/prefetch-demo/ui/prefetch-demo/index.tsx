'use client';

import { useState } from 'react';
import { preload } from 'react-dom';

export const PrefetchDemo = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'example'>('overview');
  const [showImage, setShowImage] = useState(false);
  const [showFont, setShowFont] = useState(false);

  // Демонстрация preload при наведении
  function handleImageHover() {
    // Предзагрузка изображения при наведении
    preload('https://picsum.photos/800/400', { as: 'image' });
  }

  // Демонстрация preinit
  function handleFontHover() {
    // Предзагрузка шрифта при наведении
    preload('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap', {
      as: 'style',
    });
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Обзор API
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'example' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('example')}
          >
            Интерактивный пример
          </button>
        </div>

        {activeTab === 'overview' ? (
          <OverviewTab />
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Интерактивный пример</h2>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div
                className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
                onMouseEnter={handleImageHover}
                onClick={() => setShowImage(true)}
              >
                <h3 className="font-semibold mb-2">Предзагрузка изображения</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Наведите курсор, чтобы начать предзагрузку изображения. Затем нажмите, чтобы
                  отобразить его.
                </p>
                {showImage ? (
                  <img
                    src="https://picsum.photos/800/400"
                    alt="Предзагруженное изображение"
                    className="w-full h-auto rounded"
                  />
                ) : (
                  <div className="bg-gray-200 rounded h-32 flex items-center justify-center">
                    <span className="text-gray-500">Нажмите для отображения</span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  При наведении вызывается: preload('url', &#123; as: 'image' &#125;)
                </p>
              </div>

              <div
                className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
                onMouseEnter={handleFontHover}
                onClick={() => setShowFont(true)}
              >
                <h3 className="font-semibold mb-2">Предзагрузка шрифта</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Наведите курсор, чтобы начать предзагрузку шрифта Roboto. Затем нажмите, чтобы
                  применить его.
                </p>
                {showFont && (
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
                  />
                )}
                <div className={`p-4 bg-gray-100 rounded ${showFont ? 'font-[Roboto]' : ''}`}>
                  <p className="mb-2">
                    Пример текста со шрифтом {showFont ? 'Roboto' : 'по умолчанию'}
                  </p>
                  <p className="font-bold">Жирный текст для демонстрации</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  При наведении вызывается: preload('url', &#123; as: 'style' &#125;)
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="font-semibold mb-2 text-blue-700">Как это работает?</h3>
              <p className="text-sm text-blue-600 mb-2">
                При наведении курсора на блок, React вызывает функцию preload, которая добавляет
                соответствующий тег &lt;link rel="preload"&gt; в &lt;head&gt; документа. Браузер
                начинает загрузку ресурса в фоновом режиме.
              </p>
              <p className="text-sm text-blue-600">
                Когда вы нажимаете на блок и ресурс отображается, он уже загружен или находится в
                процессе загрузки, что ускоряет отображение.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OverviewTab = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Новые API для предварительной загрузки ресурсов</h2>

      <p className="text-gray-700 mb-6">
        React 19 предоставляет набор функций для предварительной загрузки ресурсов, которые
        позволяют оптимизировать производительность, заранее сообщая браузеру о ресурсах, которые
        понадобятся в ближайшее время.
      </p>

      <div className="space-y-6">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">prefetchDNS(url)</h3>
          <p className="text-sm text-gray-600 mb-2">
            Создает &lt;link rel="dns-prefetch" href="..."&gt;, подсказывая браузеру заранее
            разрешить DNS-имя указанного хоста.
          </p>
          <div className="p-3 bg-gray-100 rounded text-xs">
            <pre className="whitespace-pre-wrap">
              {`import { prefetchDNS } from 'react-dom';

// Предварительное разрешение DNS для API-хоста
prefetchDNS("https://api.example.com");

// Результат в HTML:
// <link rel="dns-prefetch" href="https://api.example.com">`}
            </pre>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">preconnect(url)</h3>
          <p className="text-sm text-gray-600 mb-2">
            Создает &lt;link rel="preconnect" href="..."&gt;, инициируя заранее установление
            соединения (TCP handshake, TLS) с указанным хостом.
          </p>
          <div className="p-3 bg-gray-100 rounded text-xs">
            <pre className="whitespace-pre-wrap">
              {`import { preconnect } from 'react-dom';

// Предварительное установление соединения с API-хостом
preconnect("https://api.example.com");

// Результат в HTML:
// <link rel="preconnect" href="https://api.example.com">`}
            </pre>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">preload(url, options)</h3>
          <p className="text-sm text-gray-600 mb-2">
            Создает &lt;link rel="preload" href="..."&gt; для начала загрузки указанного ресурса. В
            options обязательно указывается тип ресурса через as.
          </p>
          <div className="p-3 bg-gray-100 rounded text-xs">
            <pre className="whitespace-pre-wrap">
              {`import { preload } from 'react-dom';

// Предзагрузка шрифта
preload("/fonts/Roboto.woff2", { 
  as: "font", 
  type: "font/woff2", 
  crossOrigin: "anonymous" 
});

// Предзагрузка изображения
preload("/images/hero.jpg", { as: "image" });

// Результат в HTML:
// <link rel="preload" as="font" href="/fonts/Roboto.woff2" type="font/woff2" crossorigin="anonymous">
// <link rel="preload" as="image" href="/images/hero.jpg">`}
            </pre>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">preinit(scriptUrl, options)</h3>
          <p className="text-sm text-gray-600 mb-2">
            Более "агрессивная" форма для скриптов: создает тег &lt;script&gt; с атрибутом async,
            чтобы не только начать загрузку, но и выполнить скрипт сразу после загрузки.
          </p>
          <div className="p-3 bg-gray-100 rounded text-xs">
            <pre className="whitespace-pre-wrap">
              {`import { preinit } from 'react-dom';

// Предзагрузка и инициализация скрипта аналитики
preinit("/scripts/analytics.js", { as: "script" });

// Предзагрузка и инициализация модульного скрипта
preinit("/scripts/module.js", { 
  as: "script", 
  type: "module" 
});

// Результат в HTML:
// <script async src="/scripts/analytics.js"></script>
// <script type="module" src="/scripts/module.js"></script>`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h3 className="font-semibold mb-2 text-yellow-700">Преимущества использования</h3>
        <ul className="list-disc list-inside text-sm text-yellow-600 space-y-1">
          <li>Ускорение загрузки критических ресурсов</li>
          <li>Предотвращение мигания контента (CLS)</li>
          <li>Оптимизация пользовательского опыта при навигации</li>
          <li>Автоматическая дедупликация запросов (повторные вызовы игнорируются)</li>
          <li>Работает как на сервере, так и на клиенте</li>
        </ul>
      </div>
    </div>
  );
};
