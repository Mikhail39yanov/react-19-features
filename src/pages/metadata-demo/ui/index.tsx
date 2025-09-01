import { DemoTabs } from '@/src/shrared/ui/demo-tabs';
import { MetadataDemo } from './metadata-demo';

export const MetadataDemoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Управление метаданными документа</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует новые возможности React 19 для управления метаданными документа.
      </p>

      <div className="mb-8">
        <DemoTabs
          example={<MetadataDemo />}
          description={
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Управление метаданными в React 19</h2>
                <p className="text-gray-700 mb-4">
                  В React 19 появилась встроенная поддержка управления метаданными документа. Теперь
                  можно размещать теги &lt;title&gt;, &lt;meta&gt;, &lt;link rel="stylesheet"&gt;,
                  &lt;script async&gt; и др. непосредственно в рендере компонентов.
                </p>
                <p className="text-gray-700">
                  React автоматически "поднимет" эти теги в секцию &lt;head&gt; итогового
                  HTML-документа. Это работает как при клиентском рендеринге, так и при серверном
                  (включая стриминг) и даже в среде React Server Components.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Преимущества нового подхода</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Не требуется дополнительных библиотек (например, react-helmet)</li>
                  <li>Работает как на клиенте, так и на сервере</li>
                  <li>Интегрируется с SSR и стримингом</li>
                  <li>Более декларативный подход</li>
                  <li>Поддерживает динамические метаданные</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Поддерживаемые теги</h3>
                <p className="text-gray-700">
                  React 19 автоматически перемещает в &lt;head&gt; следующие теги:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>&lt;title&gt; - заголовок страницы</li>
                  <li>&lt;meta&gt; - метаданные страницы</li>
                  <li>&lt;link&gt; - для иконок, RSS, стилей и др.</li>
                  <li>&lt;script&gt; - для асинхронных скриптов</li>
                  <li>&lt;noscript&gt; - для контента при отключенном JavaScript</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Применение</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>SEO-оптимизация страниц</li>
                  <li>Динамические заголовки страниц</li>
                  <li>Социальные метатеги (Open Graph, Twitter Cards)</li>
                  <li>Управление фавиконками</li>
                  <li>Подключение внешних шрифтов</li>
                  <li>Интеграция с аналитикой</li>
                </ul>
              </div>
            </div>
          }
          code={
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Пример использования метаданных</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// Страница блога с динамическими метаданными
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`).then(res => res.json());

  return (
    <article className="prose mx-auto">
      <title>{post.title} – Блог</title>
      <meta name="description" content={post.body.slice(0, 100)} />
      <meta name="author" content="Demo User" />
      
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Сравнение с React 18 (react-helmet)</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// React 18 с react-helmet
import { Helmet } from 'react-helmet';

function BlogPostPage({ post }) {
  return (
    <>
      <Helmet>
        <title>{post.title} – Блог</title>
        <meta name="description" content={post.body.slice(0, 100)} />
        <meta name="author" content="Demo User" />
      </Helmet>
      
      <article className="prose mx-auto">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p>{post.body}</p>
      </article>
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
  );
};
