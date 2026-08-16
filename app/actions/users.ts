"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export type RegisterState = {
  errors?: {
    username?: string
    name?: string
    password?: string
    passwordConfirm?: string
    general?: string
  }
  values?: {
    username?: string
    name?: string
  }
  success?: boolean
}

export const registerUser = async (
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const errors: RegisterState["errors"] = {}

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  if (!name || name.length === 0) {
    errors.name = "Name is required"
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  try {
    const existing = await db.query.users.findFirst({
      where: eq(users.username, username),
    })

    if (existing) {
      return {
        errors: { username: "Username already exists" },
        values: { username, name },
      }
    }

    const passwordHash = await bcrypt.hash(password, 10)
    await db.insert(users).values({ username, name, passwordHash })
  } catch (error) {
    console.error("Registration error:", error)
    return {
      errors: { general: "Registration failed. Please try again." },
      values: { username, name },
    }
  }

  redirect("/login")
}
