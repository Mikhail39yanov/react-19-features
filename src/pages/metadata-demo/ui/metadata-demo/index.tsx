'use client';

import { useState } from 'react';

export const MetadataDemo = () => {
  const [activeTab, setActiveTab] = useState<'old' | 'new'>('new');
  const [pageTitle, setPageTitle] = useState('Моя страница');
  const [pageDescription, setPageDescription] = useState('Описание моей страницы');
  const [showMetaTags, setShowMetaTags] = useState(true);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 ${
              activeTab === 'old' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('old')}
          >
            React 18 и ранее
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'new' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('new')}
          >
            React 19
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Заголовок страницы
            </label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание страницы
            </label>
            <textarea
              value={pageDescription}
              onChange={(e) => setPageDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-meta"
              checked={showMetaTags}
              onChange={(e) => setShowMetaTags(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="show-meta" className="ml-2 block text-sm text-gray-700">
              Показывать мета-теги
            </label>
          </div>
        </div>

        {activeTab === 'old' ? (
          <OldApproach
            title={pageTitle}
            description={pageDescription}
            showMetaTags={showMetaTags}
          />
        ) : (
          <NewApproach
            title={pageTitle}
            description={pageDescription}
            showMetaTags={showMetaTags}
          />
        )}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Как это работает</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold mb-2">React 18 и ранее:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Использование библиотек (react-helmet)</li>
              <li>Ручное обновление document.title в useEffect</li>
              <li>Отдельные компоненты для метаданных</li>
              <li>Специальные API фреймворков (Next.js Head)</li>
            </ul>
            <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
              <pre className="whitespace-pre-wrap">
                {`// С react-helmet
import { Helmet } from 'react-helmet';

function Page() {
  return (
    <>
      <Helmet>
        <title>Заголовок</title>
        <meta name="description" content="Описание" />
      </Helmet>
      <div>Контент</div>
    </>
  );
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">React 19:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Встроенная поддержка мета-тегов в JSX</li>
              <li>Автоматическое перемещение в &lt;head&gt;</li>
              <li>Работает в серверном и клиентском рендеринге</li>
              <li>Поддержка динамических метаданных</li>
            </ul>
            <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
              <pre className="whitespace-pre-wrap">
                {`// Встроенная поддержка в React 19
function Page() {
  return (
    <div>
      <title>Заголовок</title>
      <meta name="description" content="Описание" />
      <div>Контент</div>
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Имитация подхода React 18 и ранее
const OldApproach = ({
  title,
  description,
  showMetaTags,
}: {
  title: string;
  description: string;
  showMetaTags: boolean;
}) => {
  // В реальном приложении React 18 здесь был бы useEffect или react-helmet
  return (
    <div className="border p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Подход в React 18 и ранее</h2>

      <div className="p-4 bg-gray-100 rounded-md mb-4">
        <p className="text-sm text-gray-700 mb-2">
          В React 18 и ранее для управления метаданными использовались:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>Библиотека react-helmet</li>
          <li>Ручное обновление document.title в useEffect</li>
          <li>Специальные API фреймворков (Next.js Head)</li>
        </ul>
      </div>

      <div className="p-4 border border-dashed border-gray-300 rounded-md">
        <p className="text-sm text-gray-500 mb-2">Пример кода с react-helmet:</p>
        <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
          {`import { Helmet } from 'react-helmet';

function MyPage() {
  return (
    <>
      <Helmet>
        <title>${title}</title>
        ${showMetaTags ? `<meta name="description" content="${description}" />` : ''}
      </Helmet>
      <div>Содержимое страницы...</div>
    </>
  );
}`}
        </pre>
      </div>
    </div>
  );
};

// Новый подход в React 19
const NewApproach = ({
  title,
  description,
  showMetaTags,
}: {
  title: string;
  description: string;
  showMetaTags: boolean;
}) => {
  return (
    <div className="border p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Подход в React 19</h2>

      {/* Метаданные документа - React 19 автоматически поместит их в <head> */}
      <title>{title}</title>
      {showMetaTags && <meta name="description" content={description} />}

      <div className="p-4 bg-gray-100 rounded-md mb-4">
        <p className="text-sm text-gray-700 mb-2">
          В React 19 метаданные можно размещать прямо в JSX компонентов:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>Теги автоматически перемещаются в &lt;head&gt;</li>
          <li>Работает как в клиентском, так и в серверном рендеринге</li>
          <li>Не требует дополнительных библиотек</li>
        </ul>
      </div>

      <div className="p-4 border border-dashed border-gray-300 rounded-md">
        <p className="text-sm text-gray-500 mb-2">Пример кода с React 19:</p>
        <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
          {`function MyPage() {
  return (
    <div>
      <title>${title}</title>
      ${showMetaTags ? `<meta name="description" content="${description}" />` : ''}
      <div>Содержимое страницы...</div>
    </div>
  );
}`}
        </pre>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-700">
          <strong>Примечание:</strong> В этом демо метаданные действительно применяются к текущей
          странице. Попробуйте изменить заголовок и посмотрите на вкладку браузера!
        </p>
      </div>
    </div>
  );
};
