"use client"

import { useActionState } from "react"
import { registerUser, RegisterState } from "../actions/users"

const initialState: RegisterState = {
  errors: {},
  values: {
    username: "",
    name: "",
  },
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {state.errors?.general && (
        <p className="text-red-600 mb-4 font-medium">{state.errors.general}</p>
      )}
      <form action={formAction} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={state.values?.username || ""}
            required
            className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.username && (
            <p
              data-testid="username-error"
              className="text-red-600 text-sm mt-1"
            >
              {state.errors.username}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={state.values?.name || ""}
            required
            className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.name && (
            <p data-testid="name-error" className="text-red-600 text-sm mt-1">
              {state.errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.password && (
            <p
              data-testid="password-error"
              className="text-red-600 text-sm mt-1"
            >
              {state.errors.password}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="passwordConfirm"
          >
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            required
            className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.passwordConfirm && (
            <p
              data-testid="passwordConfirm-error"
              className="text-red-600 text-sm mt-1"
            >
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          data-testid="register-button"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  )
}
