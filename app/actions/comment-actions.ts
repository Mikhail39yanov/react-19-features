"use server"

import { revalidatePath } from "next/cache"

export async function addComment(formData: FormData) {
  const postId = formData.get("postId")?.toString()
  const text = formData.get("text")?.toString() || ""
  const author = formData.get("author")?.toString() || "Анонимный пользователь"

  if (!text || text.length < 3) {
    return {
      success: false,
      message: "Комментарий должен содержать минимум 3 символа",
    }
  }

  try {
    // Отправка комментария на фейковый API
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, body: text, name: author }),
    })

    if (!response.ok) {
      throw new Error("Ошибка при отправке комментария")
    }

    // Получаем данные созданного комментария
    const newComment = await response.json()

    // Обновляем кеш страницы с комментариями
    revalidatePath(`/posts/${postId}`)

    return {
      success: true,
      message: "Комментарий успешно добавлен",
      comment: newComment,
    }
  } catch (error) {
    console.error("Ошибка при добавлении комментария:", error)
    return {
      success: false,
      message: "Не удалось добавить комментарий",
    }
  }
}

