export default function PostsWithUseHook() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Загрузка постов с хуком use</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует использование хука use для загрузки данных из API.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 line-clamp-2">Пример поста #{i + 1}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              Этот пост имитирует данные, которые были бы загружены с использованием хука use. В
              реальном приложении с React 19 здесь были бы настоящие данные с сервера.
            </p>
            <div className="text-sm text-gray-500">Пост #{i + 1}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200 max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold mb-2">Использование use с fetch API</h3>
        <p className="text-sm text-gray-700">
          В этом примере мы имитируем использование хука use для чтения данных, полученных через
          fetch API. В React 19 промис создается вне компонента и кэшируется, чтобы избежать
          предупреждений React.
        </p>
        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
          {`// Кэшированный промис (вне компонента)
const postsPromise = fetch('/api/posts').then(res => res.json());

// Внутри компонента
function PostsList() {
  const posts = use(postsPromise);
  return <div>{posts.map(post => <Post key={post.id} {...post} />)}</div>;
}`}
        </pre>
      </div>

      <div className="text-center mt-8">
        <a href="/use-hook-demo" className="text-blue-600 hover:text-blue-800">
          ← Вернуться к демонстрации хука use
        </a>
      </div>
    </div>
  );
}
