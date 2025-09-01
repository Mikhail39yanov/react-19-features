import { ServerActionDemo } from './server-action-demo';
import { OldVsNewForm } from './old-vs-new-form';
import { DemoTabs } from '@/components/ui/demo-tabs';
import { ActionsDemoForm } from './actions-demo-form';

export const ActionsDemoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Демонстрация Actions</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует использование Actions в React 19 для обработки форм и асинхронных
        операций.
      </p>

      <div className="mb-12">
        <DemoTabs
          example={
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-xl font-bold mb-4">Client Action с useActionState</h2>
                <ActionsDemoForm />
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Server Action</h2>
                <ServerActionDemo />
              </div>
            </div>
          }
          description={
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Что такое Actions?</h2>
                <p className="text-gray-700 mb-4">
                  Actions - это новый подход к обработке форм и событий в React 19. Они представляют
                  собой асинхронные функции, которые можно привязать к событиям интерфейса вместо
                  обычных обработчиков.
                </p>
                <p className="text-gray-700">
                  При вызове Action React выполняет его внутри перехода состояния (transitions),
                  благодаря чему обновления UI происходят без блокировки основного потока. React
                  самостоятельно обрабатывает состояние загрузки (pending), ошибки и оптимистичные
                  обновления интерфейса.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Client Actions</h3>
                <p className="text-gray-700">
                  Client Actions выполняются на клиенте и могут использовать хук useActionState для
                  управления состоянием. Этот хук возвращает текущее состояние, функцию-действие и
                  флаг загрузки.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Server Actions</h3>
                <p className="text-gray-700">
                  Server Actions - это функции, которые выполняются на сервере, но могут быть
                  вызваны из клиентского кода. Они помечаются директивой "use server" и могут иметь
                  доступ к серверным ресурсам (БД, файловая система).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Применение</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Формы регистрации и авторизации</li>
                  <li>Формы обратной связи и комментариев</li>
                  <li>Обновление профиля пользователя</li>
                  <li>Создание и редактирование контента</li>
                  <li>Фильтрация и сортировка данных</li>
                  <li>Любые операции, требующие отправки данных на сервер</li>
                </ul>
              </div>
            </div>
          }
          code={
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Client Action с useActionState</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`'use client'

import { useActionState } from "react"

export default function ActionsDemoForm() {
  // Используем useActionState для управления состоянием формы
  const [state, action, isPending] = useActionState(
    async (prevState: string | null, formData: FormData) => {
      const newName = formData.get("name")?.toString() || ""

      // Проверка валидности
      if (newName.length < 3) {
        return "Имя должно содержать минимум 3 символа"
      }

      // Имитация запроса к серверу
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // В случае успеха возвращаем сообщение об успехе
      return "success:Имя успешно обновлено!"
    },
    null // начальное состояние результата
  )

  // Разделяем состояние на ошибку и успех
  const isSuccess = state?.startsWith("success:")
  const successMessage = isSuccess ? state.substring(8) : null
  const errorMessage = !isSuccess ? state : null

  return (
    <form action={action} className="space-y-4">
      {/* Форма с полями и обработкой состояний */}
    </form>
  )
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Server Action</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// app/actions/server-actions.ts
'use server'

export async function saveUserData(formData: FormData) {
  // Получаем данные из формы
  const username = formData.get('username')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  
  // Валидация на сервере
  if (!username || username.length < 3) {
    return {
      success: false,
      message: 'Имя пользователя должно содержать минимум 3 символа'
    }
  }
  
  // Имитация сохранения в БД
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Успешный ответ
  return {
    success: true,
    message: 'Данные успешно сохранены на сервере'
  }
}`}
                </pre>
              </div>
            </div>
          }
        />
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-center">Сравнение: React 18 vs React 19</h2>
        <OldVsNewForm />
      </div>

      <div className="text-center mt-8">
        <a href="/" className="text-blue-600 hover:text-blue-800">
          ← Вернуться на главную
        </a>
      </div>
    </div>
  );
};
