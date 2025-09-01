'use client';

import { useActionState } from 'react';

// Имитация API-запроса для обновления имени пользователя
async function updateNameOnServer(newName: string): Promise<string | null> {
  // Имитируем задержку сети
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Имитируем случайную ошибку для демонстрации
  if (Math.random() < 0.3) {
    return 'Ошибка сервера при обновлении имени';
  }

  return null; // null означает отсутствие ошибки
}

export const ActionsDemoForm = () => {
  // Используем useActionState для управления состоянием формы
  const [state, action, isPending] = useActionState(
    async (prevState: string | null, formData: FormData) => {
      const newName = formData.get('name')?.toString() || '';

      // Проверка валидности
      if (newName.length < 3) {
        return 'Имя должно содержать минимум 3 символа';
      }

      // Отправляем на сервер
      const errorMsg = await updateNameOnServer(newName);
      if (errorMsg) {
        return errorMsg;
      }

      // В случае успеха возвращаем сообщение об успехе
      return 'success:Имя успешно обновлено!';
    },
    null, // начальное состояние результата
  );

  // Разделяем состояние на ошибку и успех
  const isSuccess = state?.startsWith('success:');
  const successMessage = isSuccess && state ? state.substring(8) : null;
  const errorMessage = !isSuccess ? state : null;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Обновление профиля</h2>

      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Имя пользователя
          </label>
          <input
            id="name"
            name="name"
            type="text"
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
          {isPending ? 'Сохранение...' : 'Сохранить'}
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
      </form>

      <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">О функции useActionState</h3>
        <p className="text-sm text-gray-700">
          useActionState - это новый хук в React 19, который упрощает обработку форм и асинхронных
          операций. Он возвращает текущее состояние, функцию действия и флаг ожидания.
        </p>
        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
          {`const [state, action, isPending] = useActionState(
  async (prevState, formData) => {
    // Логика обработки формы
    return результат;
  }, 
  начальноеСостояние
);`}
        </pre>
      </div>
    </div>
  );
};
