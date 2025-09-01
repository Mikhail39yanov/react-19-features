import { DemoTabs } from '@/components/ui/demo-tabs';
import { ContextRefDemo } from './context-ref-demo';

export const ContextRefDemoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Улучшения Context и Ref</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Этот пример демонстрирует улучшения в работе с контекстом и рефами в React 19.
      </p>

      <div className="mb-8">
        <DemoTabs
          example={<ContextRefDemo />}
          description={
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Улучшения Context API</h2>
                <p className="text-gray-700 mb-4">
                  В React 19 для предоставления контекста потомкам можно использовать сам объект
                  контекста как JSX-компонент, вместо явного &lt;MyContext.Provider&gt;.
                </p>
                <p className="text-gray-700">
                  Это делает код чище и понятнее, уменьшает количество шаблонного кода.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">Улучшения Ref API</h2>
                <p className="text-gray-700 mb-4">
                  Функциональные компоненты теперь могут принимать проп ref напрямую, без обёртки
                  через React.forwardRef.
                </p>
                <p className="text-gray-700">
                  Если вы объявите проп ref в списке параметров компонента, React автоматически
                  будет передавать в него родительский реф. Это упрощает типизацию в TypeScript и
                  делает код более понятным.
                </p>
              </div>
            </div>
          }
          code={
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Новый синтаксис Context</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// Создание контекста
const ThemeContext = createContext("light");

// React 18 и ранее:
<ThemeContext.Provider value="dark">
  {children}
</ThemeContext.Provider>

// React 19:
<ThemeContext value="dark">
  {children}
</ThemeContext>`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Новый подход к Ref</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`// React 18 и ранее:
const MyInput = forwardRef<HTMLInputElement, { placeholder?: string }>(
  ({ placeholder }, ref) => <input ref={ref} placeholder={placeholder} />
);

// React 19:
function MyInput({ 
  placeholder, 
  ref 
}: { 
  placeholder?: string, 
  ref?: React.Ref<HTMLInputElement> 
}) {
  return <input ref={ref} placeholder={placeholder} />;
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
