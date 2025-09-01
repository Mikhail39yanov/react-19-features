export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-4">Пример поста #{params.id}</h1>
        <p className="text-gray-700 mb-6">
          Это пример содержимого поста. В реальном приложении здесь будет отображаться содержимое, загруженное с
          сервера. Этот пост имеет ID: {params.id}.
        </p>
        <div className="text-sm text-gray-500">Пост #{params.id}</div>
      </article>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Комментарии</h2>
        <p className="text-gray-500">Пока нет комментариев. Будьте первым!</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-3">Добавить комментарий</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Ваш комментарий
            </label>
            <textarea
              id="comment"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите ваш комментарий"
            />
          </div>

          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Отправить комментарий
          </button>
        </form>
      </div>
    </div>
  )
}

