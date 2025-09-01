"use client"

import type React from "react"

import { useState } from "react"

export default function UserForm() {
  const [name, setName] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Сбрасываем предыдущие состояния
    setError(null)
    setSuccess(false)

    // Валидация
    if (name.length < 3) {
      setError("Имя должно содержать минимум 3 символа")
      return
    }

    // Устанавливаем состояние загрузки
    setIsPending(true)

    try {
      // Имитируем запрос к API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Имитируем успешный ответ
      setSuccess(true)
      setName("")
    } catch (err) {
      setError("Произошла ошибка при сохранении данных")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Обновление профиля</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Имя пользователя
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите новое имя"
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isPending ? "Сохранение..." : "Сохранить"}
        </button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-600">Данные успешно сохранены!</p>
          </div>
        )}
      </form>
    </div>
  )
}

