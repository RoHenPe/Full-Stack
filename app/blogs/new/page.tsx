"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createBlog, BlogFormState } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const initialState: BlogFormState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
  success: false,
}

export default function NewBlog() {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully", "success")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      {state.errors?.general && (
        <p className="text-red-600 mb-4 font-medium">{state.errors.general}</p>
      )}
      <form action={formAction} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={state.values?.title || ""}
            required
            className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.title && (
            <p className="text-red-600 text-sm mt-1">{state.errors.title}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="author"
          >
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            defaultValue={state.values?.author || ""}
            required
            className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.author && (
            <p className="text-red-600 text-sm mt-1">{state.errors.author}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="url"
          >
            URL
          </label>
          <input
            id="url"
            type="url"
            name="url"
            defaultValue={state.values?.url || ""}
            required
            className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.url && (
            <p className="text-red-600 text-sm mt-1">{state.errors.url}</p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            data-testid="create-blog-button"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 font-semibold transition-colors"
          >
            Create
          </button>
          <Link href="/blogs" className="text-gray-600 hover:underline text-sm">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
