"use client"

import { useState } from "react"

// Имитация работы хука use
export default function UseHookDemo() {
  const [showData, setShowData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<string | null>(null)

  // Функция для имитации загрузки данных
  const loadData = () => {
    setIsLoading(true)

    // Имитируем асинхронную загрузку
    setTimeout(() => {
      setData("Данные успешно загружены!")
      setIsLoading(false)
    }, 2000)
  }

  // Обработчик нажатия на кнопку
  const handleButtonClick = () => {
    if (!showData) {
      setShowData(true)
      loadData()
    } else {
      setShowData(false)
      setData(null)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Имитация работы хука use</h2>
      <p className="text-gray-600 mb-4 text-sm">
        В этом примере мы имитируем работу хука use, который будет доступен в React 19. В реальном React 19 вместо
        явного управления состоянием загрузки можно будет использовать хук use.
      </p>

      <div className="flex justify-center mb-6">
        <button onClick={handleButtonClick} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {showData ? "Скрыть данные" : "Показать данные"}
        </button>
      </div>

      {showData && (
        <div className="mt-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Загрузка данных...</p>
          ) : (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 font-medium">{data}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">О хуке use</h3>
        <p className="text-sm text-gray-700">
          use - это новый хук в React 19, который позволяет читать значения ресурсов (промисов, контекста)
          непосредственно во время рендера компонента.
        </p>
        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
          {`// Чтение промиса
const data = use(promise);

// Чтение контекста
const theme = use(ThemeContext);`}
        </pre>
        <p className="text-xs text-gray-500 mt-2">
          Важно: промис должен быть кэширован между рендерами, иначе React выдаст предупреждение.
        </p>
      </div>
    </div>
  )
}

