import ThemeDemo from "../components/theme-demo"

export default function ContextDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Демонстрация улучшений Context</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует новый синтаксис Context в React 19, который позволяет использовать сам объект
        контекста как JSX-компонент.
      </p>

      <ThemeDemo />
    </div>
  )
}

