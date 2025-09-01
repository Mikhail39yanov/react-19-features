"use client"

import type React from "react"

import { useState } from "react"

// В React 19 можно принимать ref напрямую без forwardRef
function CustomInput({
  label,
  placeholder,
  ref, // Принимаем ref напрямую
  ...props
}: {
  label: string
  placeholder?: string
  ref?: React.Ref<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className={`relative rounded-md shadow-sm border ${isFocused ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300"}`}
      >
        <input
          ref={ref} // Используем ref напрямую
          className="block w-full px-3 py-2 border-0 rounded-md focus:outline-none bg-transparent"
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </div>
    </div>
  )
}

export default CustomInput

