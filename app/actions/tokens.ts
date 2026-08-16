"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getCurrentUser } from "../services/session"

export const generateTokenAction = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return
  }

  const newToken = crypto.randomUUID()

  if (process.env.DATABASE_URL) {
    try {
      await db
        .update(users)
        .set({ token: newToken })
        .where(eq(users.id, currentUser.id))
    } catch (error) {
      console.error("Error generating token:", error)
    }
  }

  revalidatePath("/me")
}
