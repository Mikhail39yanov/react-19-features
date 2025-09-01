"use client"

import { use } from "react"

// Типы данных
interface Post {
  id: number
  title: string
  body: string
}

// Кэшированный промис для загрузки постов
const postsPromise = fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to fetch posts")
    return res.json()
  })
  .then((data) => data.slice(0, 9)) // Ограничиваем количество постов

export default function PostsWithUseHook() {
  // Используем хук use для чтения значения промиса
  const posts = use(postsPromise) as Post[]

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
            <div className="text-sm text-gray-500">Пост #{post.id}</div>
          </article>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Использование use с fetch API</h3>
        <p className="text-sm text-gray-700">
          В этом примере мы используем хук use для чтения данных, полученных через fetch API. Важно, что промис
          создается вне компонента и кэшируется, чтобы избежать предупреждений React.
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
    </div>
  )
}

