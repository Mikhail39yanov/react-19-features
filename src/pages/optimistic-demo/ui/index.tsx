import { DemoTabs } from '@/src/shrared/ui/demo-tabs';
import { OptimisticCounter } from './optimistic-counter';

export const OptimisticDemoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Демонстрация Оптимистичных Обновлений</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует использование useOptimistic в React 19 для создания оптимистичных
        обновлений интерфейса.
      </p>

      <div className="mb-12">
        <DemoTabs
          example={<OptimisticCounter />}
          description={
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Что такое оптимистичные обновления?</h2>
                <p className="text-gray-700 mb-4">
                  Оптимистичные обновления - это подход к разработке интерфейсов, при котором UI
                  обновляется мгновенно, не дожидаясь ответа от сервера. Это создает ощущение
                  мгновенной реакции системы на действия пользователя.
                </p>
                <p className="text-gray-700">
                  Если запрос к серверу завершается успешно, оптимистичное обновление остается. Если
                  происходит ошибка, интерфейс откатывается к предыдущему состоянию.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Хук useOptimistic</h3>
                <p className="text-gray-700">
                  React 19 представляет новый хук useOptimistic, который упрощает реализацию
                  оптимистичных обновлений. Он принимает два аргумента:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Текущее состояние (которое будет восстановлено при ошибке)</li>
                  <li>Функцию обновления, которая определяет, как изменить состояние</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  Важно: оптимистичные обновления должны происходить внутри startTransition или
                  действия формы.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Преимущества</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Улучшенный пользовательский опыт благодаря мгновенной обратной связи</li>
                  <li>Снижение воспринимаемой задержки при работе с сетью</li>
                  <li>Автоматический откат при ошибках</li>
                  <li>Интеграция с другими React-хуками</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Применение</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Системы лайков и рейтингов</li>
                  <li>Добавление комментариев</li>
                  <li>Редактирование текста в реальном времени</li>
                  <li>Обновление статусов задач</li>
                  <li>Корзина покупок и оформление заказов</li>
                  <li>Любые интерфейсы, где важна быстрая реакция на действия пользователя</li>
                </ul>
              </div>
            </div>
          }
          code={
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Пример использования useOptimistic</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`'use client'

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

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md mt-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Пример с формой комментариев</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`'use client'

import { useOptimistic, startTransition } from "react"
import { useState } from "react"

// Тип для комментария
interface Comment {
  id: number;
  text: string;
  author: string;
  pending?: boolean;
}

export default function OptimisticComments() {
  // Состояние комментариев
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "Отличная статья!", author: "Алексей" },
    { id: 2, text: "Очень полезно, спасибо!", author: "Мария" }
  ]);
  
  // Оптимистичное состояние комментариев
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment: Comment) => [...state, { ...newComment, pending: true }]
  );
  
  // Состояние формы
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [isPending, setIsPending] = useState(false);
  
  // Обработчик отправки комментария
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    setIsPending(true);
    
    // Создаем новый комментарий
    const newComment = {
      id: Date.now(),
      text,
      author: author || "Анонимный пользователь"
    };
    
    // Оптимистично добавляем комментарий
    startTransition(() => {
      addOptimisticComment(newComment);
    });
    
    // Имитация отправки на сервер
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Обновляем реальное состояние
      setComments(prev => [...prev, newComment]);
      
      // Очищаем форму
      setText("");
      setAuthor("");
    } catch (error) {
      // В случае ошибки оптимистичное состояние автоматически откатится
      console.error("Ошибка при отправке комментария:", error);
    } finally {
      setIsPending(false);
    }
  }
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Комментарии</h2>
      
      <div className="space-y-4 mb-6">
        {optimisticComments.map(comment => (
          <div 
            key={comment.id} 
            className={\`p-4 border rounded-md \${comment.pending ? "bg-gray-50 opacity-70" : "bg-white"}\`}
          >
            <p className="mb-2">{comment.text}</p>
            <p className="text-sm text-gray-600">
              {comment.author}
              {comment.pending && " (отправляется...)"}
            </p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ваше имя
          </label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Необязательно"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Комментарий
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isPending || !text.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Отправка..." : "Отправить комментарий"}
        </button>
      </form>
    </div>
  );
}`}
                </pre>
              </div>
            </div>
          }
        />
      </div>

      <div className="text-center mt-8">
        <a href="/" className="text-blue-600 hover:text-blue-800">
          ← Вернуться на главную
        </a>
      </div>
    </div>
  );
};
