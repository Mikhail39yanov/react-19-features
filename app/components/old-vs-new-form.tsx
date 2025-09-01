"use client"

import type React from "react"

import { useState } from "react"
import { useActionState } from "react"

export default function OldVsNewForm() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">React 18: Традиционный подход</h3>
        <OldStyleForm />
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">React 19: Actions</h3>
        <NewStyleForm />
      </div>
    </div>
  )
}

// Традиционный подход с React 18
function OldStyleForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // Предотвращаем стандартное поведение формы

    // Сбрасываем состояния
    setError(null)
    setSuccess(false)
    setIsSubmitting(true)

    try {
      // Валидация
      if (!email || !email.includes("@")) {
        setError("Введите корректный email")
        return
      }

      // Имитация запроса к API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Обработка успеха
      setSuccess(true)
      setEmail("") // Сброс поля вручную
    } catch (err) {
      setError("Произошла ошибка при отправке")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="old-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="old-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Введите email"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? "Отправка..." : "Подписаться"}
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">Вы успешно подписались!</p>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-2">
        <p>Особенности:</p>
        <ul className="list-disc list-inside">
          <li>Ручное предотвращение отправки (e.preventDefault)</li>
          <li>Ручное управление состоянием загрузки</li>
          <li>Ручная валидация и обработка ошибок</li>
          <li>Ручной сброс полей формы</li>
        </ul>
      </div>
    </form>
  )
}

// Новый подход с React 19 Actions
function NewStyleForm() {
  const [state, action, isPending] = useActionState(async (_prevState: string | null, formData: FormData) => {
    const email = formData.get("email")?.toString() || ""

    // Валидация
    if (!email || !email.includes("@")) {
      return "Введите корректный email"
    }

    // Имитация запроса к API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Успех (null или специальный маркер)
    return "success:Вы успешно подписались!"
  }, null)

  // Разделяем состояние на ошибку и успех
  const isSuccess = state?.startsWith("success:")
  const successMessage = isSuccess ? state.substring(8) : null
  const errorMessage = !isSuccess ? state : null

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="new-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="new-email"
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
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isPending ? "Отправка..." : "Подписаться"}
      </button>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">{successMessage}</p>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-2">
        <p>Особенности:</p>
        <ul className="list-disc list-inside">
          <li>Автоматическая обработка отправки формы</li>
          <li>Автоматическое управление состоянием загрузки</li>
          <li>Декларативная обработка ошибок</li>
          <li>Автоматический сброс полей формы при успехе</li>
        </ul>
      </div>
    </form>
  )
}

