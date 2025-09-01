"use client"

import { useOptimistic, startTransition } from "react"
import { useState } from "react"

// Имитация API-запроса для обновления счетчика
async function updateCountOnServer(count: number): Promise<{ success: boolean; error?: string }> {
  // Имитируем задержку сети
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Имитируем случайную ошибку для демонстрации отката
  const success = Math.random() > 0.3
  return {
    success,
    error: success ? undefined : "Ошибка сервера при обновлении счетчика",
  }
}

export default function OptimisticCounter() {
  // Реальное состояние счетчика
  const [count, setCount] = useState(0)

  // Состояние загрузки и ошибки
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Оптимистичное состояние счетчика с функцией обновления
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count, // Исходное состояние
    (currentState, newCount: number) => newCount, // Функция обновления
  )

  // Обработчик увеличения счетчика
  async function handleIncrement() {
    // Сбрасываем ошибку
    setError(null)
    setIsPending(true)

    // Используем startTransition для оптимистичного обновления
    startTransition(() => {
      // Оптимистично увеличиваем счетчик
      addOptimisticCount(count + 1)
    })

    try {
      // Отправляем обновление на сервер
      const result = await updateCountOnServer(count + 1)

      if (result.success) {
        // Если успешно, обновляем реальное состояние
        setCount(count + 1)
      } else {
        // Если ошибка, показываем сообщение
        setError(result.error || "Произошла ошибка")
        // useOptimistic автоматически откатит значение к count
      }
    } catch (error) {
      setError("Произошла непредвиденная ошибка")
    } finally {
      setIsPending(false)
    }
  }

  // Отображаем информацию о состоянии для отладки
  const stateInfo = {
    realCount: count,
    optimisticCount: optimisticCount,
    isPending,
    hasError: error !== null,
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Оптимистичный счетчик</h2>

      <div className="text-center">
        <div className="text-5xl font-bold mb-4">{optimisticCount}</div>

        <button
          onClick={handleIncrement}
          disabled={isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Обновление..." : "Увеличить"}
        </button>

        <p className="text-sm text-gray-500 mt-2">
          Счетчик обновляется оптимистично, но откатывается при ошибке сервера
        </p>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md mt-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Отображение состояния для демонстрации */}
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md text-left">
          <h3 className="text-sm font-semibold mb-2">Состояние:</h3>
          <pre className="text-xs overflow-x-auto">{JSON.stringify(stateInfo, null, 2)}</pre>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">О хуке useOptimistic</h3>
        <p className="text-sm text-gray-700">
          useOptimistic - это новый хук в React 19, который позволяет создавать оптимистичные обновления UI. Он
          принимает два аргумента:
        </p>
        <ol className="text-sm text-gray-700 list-decimal list-inside mt-2 space-y-1">
          <li>Текущее состояние (которое будет восстановлено при ошибке)</li>
          <li>Функцию обновления, которая определяет, как изменить состояние</li>
        </ol>
        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
          {`const [optimisticState, addOptimistic] = useOptimistic(
  currentState,
  (state, update) => newState
);

// Использование с startTransition
startTransition(() => {
  addOptimistic(newValue);
});`}
        </pre>
        <p className="text-xs text-gray-500 mt-2">
          Важно: оптимистичные обновления должны происходить внутри startTransition или действия формы.
        </p>
      </div>
    </div>
  )
}

