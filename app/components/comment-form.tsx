"use client"

import { useActionState } from "react"
import { addComment } from "../actions/comment-actions"

export default function CommentForm({ postId }: { postId: string }) {
  const [state, action, isPending] = useActionState(addComment, null)

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-3">Добавить комментарий</h3>

      <form action={action} className="space-y-4">
        <input type="hidden" name="postId" value={postId} />

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Ваше имя
          </label>
          <input
            id="author"
            name="author"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Представьтесь (необязательно)"
          />
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Комментарий
          </label>
          <textarea
            id="text"
            name="text"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите ваш комментарий"
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {isPending ? "Отправка..." : "Отправить комментарий"}
        </button>

        {state && (
          <div
            className={`p-3 rounded-md ${state.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
          >
            <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
          </div>
        )}
      </form>
    </div>
  )
}

