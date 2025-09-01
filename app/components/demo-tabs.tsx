"use client"

import { useState, type ReactNode } from "react"

interface DemoTabsProps {
  example: ReactNode
  description: ReactNode
  code: ReactNode
}

export default function DemoTabs({ example, description, code }: DemoTabsProps) {
  const [activeTab, setActiveTab] = useState<"example" | "description" | "code">("example")

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex border-b">
        <button
          className={`px-4 py-3 font-medium ${activeTab === "example" ? "bg-white border-b-2 border-blue-500 text-blue-600" : "bg-gray-50 text-gray-600"}`}
          onClick={() => setActiveTab("example")}
        >
          Пример
        </button>
        <button
          className={`px-4 py-3 font-medium ${activeTab === "description" ? "bg-white border-b-2 border-blue-500 text-blue-600" : "bg-gray-50 text-gray-600"}`}
          onClick={() => setActiveTab("description")}
        >
          Описание
        </button>
        <button
          className={`px-4 py-3 font-medium ${activeTab === "code" ? "bg-white border-b-2 border-blue-500 text-blue-600" : "bg-gray-50 text-gray-600"}`}
          onClick={() => setActiveTab("code")}
        >
          Код
        </button>
      </div>

      <div className="p-6">
        {activeTab === "example" && <div className="example-tab">{example}</div>}

        {activeTab === "description" && <div className="description-tab">{description}</div>}

        {activeTab === "code" && <div className="code-tab">{code}</div>}
      </div>
    </div>
  )
}

