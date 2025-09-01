"use server"

export async function saveUserData(formData: FormData) {
  // Получаем данные из формы
  const username = formData.get("username")?.toString() || ""
  const email = formData.get("email")?.toString() || ""

  // Валидация на сервере
  if (!username || username.length < 3) {
    return {
      success: false,
      message: "Имя пользователя должно содержать минимум 3 символа",
    }
  }

  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Введите корректный email",
    }
  }

  // Имитация задержки сервера
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Имитация сохранения в БД
  console.log("Сохранение на сервере:", { username, email })

  // Имитация случайной ошибки сервера (20% вероятность)
  if (Math.random() < 0.2) {
    return {
      success: false,
      message: "Ошибка сервера при сохранении данных",
    }
  }

  // Успешный ответ
  return {
    success: true,
    message: "Данные успешно сохранены на сервере",
  }
}

