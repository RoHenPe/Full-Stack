"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const isSuccess = type === "success"

  return (
    <div
      data-testid="notification"
      className={`p-3 mb-4 rounded text-white font-medium ${
        isSuccess ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  )
}
