"use client"

import { useState } from "react"
import { saveUserData } from "../actions/server-actions"

export default function ServerActionDemo() {
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    setMessage(null)

    try {
      const result = await saveUserData(formData)

      if (result.success) {
        setIsSuccess(true)
        setMessage(result.message)
      } else {
        setIsSuccess(false)
        setMessage(result.message)
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage("Произошла непредвиденная ошибка")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Имя пользователя
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите имя пользователя"
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите email"
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {isPending ? "Сохранение..." : "Сохранить на сервере"}
        </button>

        {message && (
          <div
            className={`p-3 ${isSuccess ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"} rounded-md`}
          >
            <p className={`text-sm ${isSuccess ? "text-green-600" : "text-red-600"}`}>{message}</p>
          </div>
        )}
      </form>

      <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
        <p className="font-medium mb-1">Server Action:</p>
        <p className="text-gray-600">
          Функция выполняется на сервере, имеет доступ к серверным ресурсам (БД, файловая система). Клиент просто
          вызывает её через form action.
        </p>
      </div>
    </div>
  )
}

