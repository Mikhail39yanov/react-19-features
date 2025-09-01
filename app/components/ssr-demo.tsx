"use client"

import { useState } from "react"

export default function SSRDemo() {
  const [activeTab, setActiveTab] = useState<"prerender" | "streaming" | "hydration">("prerender")

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex border-b mb-6 overflow-x-auto">
          <button
            className={`px-4 py-2 whitespace-nowrap ${activeTab === "prerender" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("prerender")}
          >
            prerender API
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${activeTab === "streaming" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("streaming")}
          >
            Стриминг SSR
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${activeTab === "hydration" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("hydration")}
          >
            Улучшения гидратации
          </button>
        </div>

        {activeTab === "prerender" && <PrerenderDemo />}
        {activeTab === "streaming" && <StreamingDemo />}
        {activeTab === "hydration" && <HydrationDemo />}
      </div>
    </div>
  )
}

function PrerenderDemo() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">prerender API для статической генерации</h2>

      <div className="p-4 border rounded-md mb-6">
        <h3 className="font-semibold mb-2">Что такое prerender?</h3>
        <p className="text-sm text-gray-700 mb-4">
          prerender - это новый API в React 19, который позволяет отрендерить React-дерево в HTML, дождавшись выполнения
          всех асинхронных операций внутри (например, данных, получаемых через Suspense).
        </p>
        <p className="text-sm text-gray-700">
          В отличие от традиционного renderToString, который мог вернуть HTML с "дырками" (плейсхолдеры от Suspense) и
          требовал дополнительного прохода, prerender гарантирует, что на момент получения результата все
          Suspense-промисы завершены и в HTML уже вставлен окончательный контент.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 18 и ранее:</h3>
          <div className="p-3 bg-gray-100 rounded text-xs">
            <pre className="whitespace-pre-wrap">
              {`import { renderToString } from 'react-dom/server';

// Рендеринг в строку
const html = renderToString(<App />);

// Проблемы:
// - Не ждет разрешения Suspense
// - Возвращает HTML с fallback-содержимым
// - Требует дополнительной гидратации`}
            </pre>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 19:</h3>
          <div className="p-3 bg-gray-100 rounded text-xs">
            <pre className="whitespace-pre-wrap">
              {`import { prerender } from 'react-dom/static';

// Полный пререндеринг с ожиданием данных
const { prelude, content } = await prerender(<App />, {
  bootstrapScripts: ["/bundle.js"]
});

// Преимущества:
// - Ждет разрешения всех Suspense
// - Возвращает полный HTML с данными
// - Оптимизирован для статической генерации`}
            </pre>
          </div>
        </div>
      </div>

      <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold mb-3">Применение prerender:</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Генерация статических страниц (SSG)</li>
          <li>Incremental Static Regeneration (ISR)</li>
          <li>Предварительный рендеринг страниц с данными</li>
          <li>Кэширование страниц с полным содержимым</li>
        </ul>
        <p className="text-sm text-blue-600 mt-4">
          В Next.js 15 prerender может использоваться под капотом для реализации статической генерации страниц, где
          важно получить готовый HTML с данными (например, при фоновой регенерации страницы).
        </p>
      </div>
    </div>
  )
}

function StreamingDemo() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Стриминг SSR</h2>

      <div className="p-4 border rounded-md mb-6">
        <h3 className="font-semibold mb-2">Что такое стриминг SSR?</h3>
        <p className="text-sm text-gray-700 mb-4">
          Стриминг SSR - это техника, при которой HTML отдаётся частями по мере готовности, а не ждет полной загрузки
          всех данных. React 18 ввел эту возможность, а React 19 улучшил её производительность и стабильность.
        </p>
        <p className="text-sm text-gray-700">
          Стриминг работает в сочетании с Suspense: когда компонент "приостанавливается" из-за загрузки данных, React
          может отправить HTML с заглушкой (fallback), а затем, когда данные будут готовы, отправить дополнительный HTML
          для замены заглушки.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">Традиционный SSR:</h3>
          <div className="p-3 bg-gray-100 rounded-md mb-4">
            <div className="flex items-center justify-center h-32">
              <div className="space-y-2 w-full">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            1. Сервер ждет загрузки <b>всех</b> данных
          </p>
          <p className="text-xs text-gray-600">
            2. Рендерит <b>весь</b> HTML
          </p>
          <p className="text-xs text-gray-600">
            3. Отправляет <b>полную</b> страницу клиенту
          </p>
          <p className="text-xs text-gray-600">
            4. Браузер отображает страницу <b>только после</b> получения всего HTML
          </p>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">Стриминг SSR:</h3>
          <div className="p-3 bg-gray-100 rounded-md mb-4">
            <div className="flex flex-col space-y-2">
              <div className="h-8 bg-blue-100 rounded w-full"></div>
              <div className="h-16 bg-green-100 rounded w-full"></div>
              <div className="h-8 bg-yellow-100 rounded w-full"></div>
              <div className="h-16 bg-red-100 rounded w-full"></div>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            1. Сервер отправляет <b>каркас</b> страницы <b>сразу</b>
          </p>
          <p className="text-xs text-gray-600">2. Браузер начинает отображать UI и загружать ресурсы</p>
          <p className="text-xs text-gray-600">
            3. Сервер отправляет <b>дополнительные части</b> HTML по мере готовности данных
          </p>
          <p className="text-xs text-gray-600">
            4. Браузер <b>постепенно</b> обновляет страницу без перезагрузки
          </p>
        </div>
      </div>

      <div className="p-5 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-semibold mb-3">Преимущества стриминга в React 19:</h3>
        <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
          <li>Более быстрое время до первого отображения (FP)</li>
          <li>Постепенное улучшение UI по мере загрузки данных</li>
          <li>Лучшая отзывчивость для пользователя</li>
          <li>Оптимизированная загрузка ресурсов</li>
          <li>Улучшенная интеграция с Suspense</li>
        </ul>
        <p className="text-sm text-green-600 mt-4">
          В Next.js 15 стриминг используется по умолчанию в App Router. Компоненты, обернутые в Suspense, будут
          стримиться автоматически, а loading.js файлы создают Suspense-границы для целых страниц.
        </p>
      </div>
    </div>
  )
}

function HydrationDemo() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Улучшения гидратации</h2>

      <div className="p-4 border rounded-md mb-6">
        <h3 className="font-semibold mb-2">Что такое гидратация?</h3>
        <p className="text-sm text-gray-700 mb-4">
          Гидратация - это процесс, при котором React на клиенте "оживляет" HTML, сгенерированный на сервере, добавляя к
          нему обработчики событий и состояние.
        </p>
        <p className="text-sm text-gray-700">
          React 19 значительно улучшил обработку ошибок гидратации и учёл моменты, которые мешали гидратации из-за
          вмешательства сторонних скриптов или расширений браузера.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 18 и ранее:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>Любое расхождение HTML приводило к полной перерисовке</li>
            <li>Неинформативные сообщения об ошибках</li>
            <li>Проблемы с расширениями браузера</li>
            <li>Двойное логирование ошибок в режиме разработки</li>
          </ul>
          <div className="p-3 bg-gray-100 rounded text-xs mt-4">
            <pre className="whitespace-pre-wrap text-red-500">
              {`Warning: Text content did not match.
Server: "Hello" Client: "Hello World"

Warning: Expected server HTML to contain a matching <div> in <div>.`}
            </pre>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">React 19:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>Игнорирование лишних узлов от расширений браузера</li>
            <li>Информативные сообщения об ошибках</li>
            <li>Устойчивость к внешним изменениям DOM</li>
            <li>Единообразное логирование ошибок</li>
          </ul>
          <div className="p-3 bg-gray-100 rounded text-xs mt-4">
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

      <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
        <h3 className="font-semibold mb-3">Ключевые улучшения гидратации в React 19:</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold text-purple-700 mb-2">Устойчивость к внешним изменениям:</h4>
            <p className="text-xs text-purple-600">
              Если при гидратации встречаются лишние узлы в DOM, вставленные сторонними скриптами или расширениями
              браузера, React 19 научился их игнорировать. Раньше любое расхождение приводило к ошибке и полной
              перерисовке всего контейнера.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-purple-700 mb-2">Информативные сообщения об ошибках:</h4>
            <p className="text-xs text-purple-600">
              Сообщения об ошибках гидратации стали гораздо информативнее. Теперь при несоответствии HTML React выводит
              одно подробное сообщение, в котором наглядно показывает, какой именно фрагмент не совпал, и перечисляет
              возможные причины проблемы.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

