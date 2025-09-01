export default function PostsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Список постов</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Пример поста #{i + 1}</h2>
            <p className="text-gray-600 mb-4">
              Это пример содержимого поста. В реальном приложении здесь будет отображаться содержимое, загруженное с
              сервера.
            </p>
            <a href={`/posts/${i + 1}`} className="text-blue-600 hover:text-blue-800 font-medium">
              Читать далее →
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}

