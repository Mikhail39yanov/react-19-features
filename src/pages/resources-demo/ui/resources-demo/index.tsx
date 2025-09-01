'use client';

import { useState } from 'react';

export const ResourcesDemo = () => {
  const [activeTab, setActiveTab] = useState<'styles' | 'scripts'>('styles');

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 ${
              activeTab === 'styles' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('styles')}
          >
            Загрузка стилей
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'scripts' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('scripts')}
          >
            Загрузка скриптов
          </button>
        </div>

        {activeTab === 'styles' ? <StylesDemo /> : <ScriptsDemo />}
      </div>
    </div>
  );
};

const StylesDemo = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Управление стилями в React 19</h2>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 18 и ранее:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Стили обычно импортировались в JS</li>
            <li>Или подключались в HTML-шаблоне</li>
            <li>Сложно контролировать порядок загрузки</li>
            <li>Риск FOUC (Flash of Unstyled Content) (мигание нестилизованного контента)</li>
          </ul>
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
            <pre className="whitespace-pre-wrap">
              {`// Импорт в JS
import './styles.css';

// Или в HTML шаблоне
<link rel="stylesheet" href="/styles.css" />`}
            </pre>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 19:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Атрибут precedence для приоритизации</li>
            <li>Автоматическая дедупликация стилей</li>
            <li>Интеграция с Suspense</li>
            <li>Предотвращение FOUC</li>
          </ul>
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
            <pre className="whitespace-pre-wrap">
              {`// В JSX компонента
<link 
  rel="stylesheet" 
  href="/theme.css" 
  precedence="high" 
/>

// Стили с precedence="high" применятся
// после стилей с precedence="default"`}
            </pre>
          </div>
        </div>
      </div>

      <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold mb-3">Пример использования precedence</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-3 bg-white rounded border">
            <h4 className="text-sm font-medium mb-2">Компонент Base</h4>
            <pre className="text-xs bg-gray-50 p-2 rounded">
              {`function Base() {
  return (
    <>
      <link 
        rel="stylesheet" 
        href="/base.css" 
        precedence="default" 
      />
      <div className="base">
        Базовый компонент
      </div>
    </>
  );
}`}
            </pre>
          </div>

          <div className="p-3 bg-white rounded border">
            <h4 className="text-sm font-medium mb-2">Компонент Theme</h4>
            <pre className="text-xs bg-gray-50 p-2 rounded">
              {`function Theme() {
  return (
    <>
      <link 
        rel="stylesheet" 
        href="/theme.css" 
        precedence="high" 
      />
      <div className="themed">
        Компонент с темой
      </div>
    </>
  );
}`}
            </pre>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>Результат:</strong> React автоматически разместит оба стиля в &lt;head&gt;, но
            theme.css будет после base.css, что позволит стилям темы переопределить базовые стили.
            Даже если Theme рендерится раньше Base в дереве компонентов, порядок стилей будет
            правильным.
          </p>
        </div>
      </div>
    </div>
  );
};

const ScriptsDemo = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Управление скриптами в React 19</h2>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 18 и ранее:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Скрипты обычно подключались в HTML-шаблоне</li>
            <li>Или динамически через useEffect</li>
            <li>Сложно отслеживать дубликаты</li>
            <li>Ручная проверка загрузки скрипта</li>
          </ul>
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
            <pre className="whitespace-pre-wrap">
              {`// В useEffect
useEffect(() => {
  const script = document.createElement('script');
  script.src = '/analytics.js';
  script.async = true;
  document.head.appendChild(script);
  
  return () => {
    document.head.removeChild(script);
  };
}, []);`}
            </pre>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 19:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>
              Поддержка <code>&lt;script async&gt;</code> в JSX
            </li>
            <li>Автоматическая дедупликация скриптов</li>
            <li>Перемещение в &lt;head&gt; при SSR</li>
            <li>Приоритизация загрузки</li>
          </ul>
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
            <pre className="whitespace-pre-wrap">
              {`// Прямо в JSX компонента
<script 
  async 
  src="/analytics.js" 
/>

// React автоматически переместит скрипт
// в <head> и предотвратит дубликаты`}
            </pre>
          </div>
        </div>
      </div>

      <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold mb-3">Пример использования скриптов</h3>

        <div className="p-3 bg-white rounded border mb-4">
          <h4 className="text-sm font-medium mb-2">Компонент Map</h4>
          <pre className="text-xs bg-gray-50 p-2 rounded">
            {`function Map({ location }) {
  return (
    <div className="map-container">
      <script 
        async 
        src="https://maps.example.com/api.js" 
      />
      <div>Карта для локации: {location}</div>
    </div>
  );
}`}
          </pre>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <h4 className="text-sm font-medium mb-2">Преимущества:</h4>
            <ul className="list-disc list-inside text-xs text-blue-700 space-y-1">
              <li>Скрипт загружается только один раз</li>
              <li>Даже если Map используется несколько раз</li>
              <li>При SSR скрипт перемещается в &lt;head&gt;</li>
              <li>Загрузка начинается раньше</li>
              <li>Не блокирует рендеринг контента</li>
            </ul>
          </div>

          <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
            <h4 className="text-sm font-medium mb-2">Важно помнить:</h4>
            <ul className="list-disc list-inside text-xs text-yellow-700 space-y-1">
              <li>Используйте async для неблокирующей загрузки</li>
              <li>Избегайте defer при стриминге</li>
              <li>Не используйте onLoad/onError, если хотите автоматическую оптимизацию</li>
              <li>Для модульных скриптов используйте type="module"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
