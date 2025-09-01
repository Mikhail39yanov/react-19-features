"use client"

import Link from "next/link"
import type { Post } from "../lib/api"

// Клиентский компонент для отображения списка постов
export default function PostsList({ initialPosts }: { initialPosts: Post[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {initialPosts.map((post) => (
        <article key={post.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
          <Link href={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
            Читать далее →
          </Link>
        </article>
      ))}

      {initialPosts.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">Посты не найдены</p>
        </div>
      )}
    </div>
  )
}

