'use client';

import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Компонент для отображения при ошибке
const ErrorFallback = () => {
  return (
    <div className="p-4 border border-red-200 bg-red-50 rounded-md">
      <h4 className="text-sm font-semibold text-red-700 mb-2">Произошла ошибка!</h4>
      <p className="text-xs text-red-600 mb-4">
        Компонент вызвал ошибку, но Error Boundary перехватил её и отобразил этот запасной UI вместо
        упавшего компонента.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
      >
        Перезагрузить страницу
      </button>
    </div>
  );
};

// Компонент с ошибкой для демонстрации Error Boundary
const BuggyCounter = () => {
  const [counter, setCounter] = useState(0);

  function handleClick() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  // Искусственно вызываем ошибку при counter > 3
  if (counter > 3) {
    throw new Error('Счетчик не может быть больше 3!');
  }

  return (
    <div className="p-4 border rounded-md">
      <h4 className="text-sm font-semibold mb-2">Компонент с ошибкой</h4>
      <p className="text-xs text-gray-600 mb-4">
        Этот компонент намеренно вызывает ошибку при счетчике больше 3. Error Boundary перехватит
        ошибку и покажет запасной UI.
      </p>
      <div className="flex items-center space-x-4">
        <span className="text-lg font-bold">{counter}</span>
        <button
          onClick={handleClick}
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          Увеличить
        </button>
      </div>
    </div>
  );
};

export const ErrorHandlingDemo = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-whiteite p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Улучшения обработки ошибок в React 19</h2>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-3">React 18 и ранее:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Неинформативные сообщения об ошибках гидратации</li>
              <li>Двойное логирование ошибок в режиме разработки</li>
              <li>Сложная отладка ошибок SSR</li>
              <li>Проблемы с Error Boundary при Suspense</li>
            </ul>
          </div>

          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-3">React 19:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Подробные сообщения об ошибках с рекомендациями</li>
              <li>Единообразное логирование ошибок</li>
              <li>Улучшенная интеграция Error Boundary и Suspense</li>
              <li>Лучшая диагностика проблем гидратации</li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-4">Демонстрация Error Boundary</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={(error) => {
                console.log('Ошибка перехвачена Error Boundary:', error);
              }}
            >
              <BuggyCounter />
            </ErrorBoundary>

            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-semibold mb-2">Как это работает</h4>
              <p className="text-xs text-gray-600 mb-2">
                Error Boundary - это компонент React, который перехватывает ошибки JavaScript в
                дочернем дереве компонентов, логирует их и отображает запасной UI вместо упавшего
                дерева компонентов.
              </p>
              <p className="text-xs text-gray-600">
                В React 19 улучшена интеграция Error Boundary с Suspense и асинхронным рендерингом.
                Теперь ошибки в асинхронном коде (например, при загрузке данных) корректно
                перехватываются.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200 mb-8">
          <h3 className="font-semibold mb-3 text-yellow-800">
            Улучшенные сообщения об ошибках гидратации
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-yellow-700 mb-2">React 18:</h4>
              <div className="p-3 bg-white rounded border border-yellow-200 text-xs">
                <pre className="whitespace-pre-wrap text-red-500">
                  {`Warning: Text content did not match.
Server: "Hello" Client: "Hello World"

Warning: Expected server HTML to contain a matching <div> in <div>.`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-yellow-700 mb-2">React 19:</h4>
              <div className="p-3 bg-white rounded border border-yellow-200 text-xs">
                <pre className="whitespace-pre-wrap text-yellow-600">
                  {`Ошибка гидратации: HTML, сгенерированный на сервере, не соответствует клиентскому.
Этот узел будет заново отрендерен на клиенте. Возможные причины:

- В компоненте использована конструкция, зависящая от \`typeof window\`
- Используется непредсказуемое значение, например \`Date.now()\`
- Форматирование даты/локали отличается между сервером и клиентом
- Данные изменились после генерации HTML
- Нарушена вложенность HTML-тегов
- Либо у пользователя установлено расширение, которое изменяет DOM`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold mb-3 text-blue-800">
            Ключевые улучшения обработки ошибок в React 19
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-blue-700 mb-1">
                1. Устойчивость к внешним изменениям DOM
              </h4>
              <p className="text-xs text-blue-600">
                Если при гидратации встречаются лишние узлы в DOM, вставленные сторонними скриптами
                или расширениями браузера, React 19 научился их игнорировать. Раньше любое
                расхождение приводило к ошибке и полной перерисовке всего контейнера.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-blue-700 mb-1">
                2. Информативные сообщения об ошибках
              </h4>
              <p className="text-xs text-blue-600">
                Сообщения об ошибках стали гораздо информативнее. Теперь при несоответствии HTML
                React выводит одно подробное сообщение, в котором наглядно показывает, какой именно
                фрагмент не совпал, и перечисляет возможные причины проблемы.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-blue-700 mb-1">
                3. Единообразное логирование ошибок
              </h4>
              <p className="text-xs text-blue-600">
                React 19 избавился от двойного логирования ошибок в режиме разработки. Раньше, если
                ошибка была поймана Error Boundary, React всё равно мог вывести её стек дважды
                (из-за попытки повторного рендера в Strict Mode). Теперь таких дублей нет – ошибки
                выводятся единообразно.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-blue-700 mb-1">
                4. Улучшенная интеграция с Suspense
              </h4>
              <p className="text-xs text-blue-600">
                Ошибки, возникающие при загрузке данных через Suspense, теперь корректно
                перехватываются ближайшим Error Boundary. Это упрощает создание надежных асинхронных
                интерфейсов.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
