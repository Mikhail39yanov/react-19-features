import UserForm from "../components/user-form"

export default function UserFormPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Форма пользователя</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует использование Actions в React 19 для обработки форм и асинхронных операций.
      </p>

      <UserForm />
    </div>
  )
}

