import SSRDemo from "../components/ssr-demo"
import DemoTabs from "../components/demo-tabs"

export default function SSRDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">SSR и стриминг</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует улучшения в серверном рендеринге и стриминге в React 19.
      </p>

      <div className="mb-8">
        <DemoTabs
          example={<SSRDemo />}
          description={
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Улучшения SSR в React 19</h2>
                <p className="text-gray-700 mb-4">
                  React 19 продолжает развивать возможности серверного рендеринга и вводит новый API для генерации
                  полностью готового HTML с учётом всех данных – функции prerender и prerenderToNodeStream из пакета
                  react-dom/static.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">prerender для статической генерации</h3>
                <p className="text-gray-700">
                  Новые методы ReactDOM.prerender и ReactDOM.prerenderToNodeStream позволяют отрендерить React-дерево в
                  HTML, дождавшись выполнения всех асинхронных операций внутри (например, данных, получаемых через
                  Suspense).
                </p>
                <p className="text-gray-700">
                  В отличие от традиционного renderToString, который мог вернуть HTML с "дырами" (плейсхолдеры от
                  Suspense) и требовал дополнительного прохода, prerender гарантирует, что на момент получения
                  результата все Suspense-промисы завершены и в HTML уже вставлен окончательный контент.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Стриминг SSR</h3>
                <p className="text-gray-700">
                  Стриминг SSR - это техника, при которой HTML отдаётся частями по мере готовности, а не ждет полной
                  загрузки всех данных. React 18 ввел эту возможность, а React 19 улучшил её производительность и
                  стабильность.
                </p>
                <p className="text-gray-700">
                  Стриминг работает в сочетании с Suspense: когда компонент "приостанавливается" из-за загрузки данных,
                  React может отправить HTML с заглушкой (fallback), а затем, когда данные будут готовы, отправить
                  дополнительный HTML для замены заглушки.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Улучшения гидратации</h3>
                <p className="text-gray-700">
                  React 19 значительно улучшил обработку ошибок гидратации и учёл моменты, которые мешали гидратации
                  из-за вмешательства сторонних скриптов или расширений браузера.
                </p>
              </div>
            </div>
          }
          code={
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Пример использования prerender</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`import { prerender } from 'react-dom/static';

// Полный пререндеринг с ожиданием данных
const { prelude, content } = await prerender(<App />, {
  bootstrapScripts: ["/bundle.js"]
});

// Отправка HTML клиенту
res.write('<!DOCTYPE html>');
res.write(prelude);
res.write(content);
res.end();`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Пример стриминга с Suspense</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// Компонент с Suspense для стриминга
function HomePage() {
  return (
    <div>
      <Header />
      
      {/* Этот контент будет отправлен сразу */}
      <MainContent />
      
      {/* Эти компоненты будут стримиться по мере загрузки данных */}
      <Suspense fallback={<ProductsSkeleton />}>
        <RecommendedProducts />
      </Suspense>
      
      <Suspense fallback={<ReviewsSkeleton />}>
        <LatestReviews />
      </Suspense>
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

