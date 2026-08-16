import { auth } from "@/auth"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const getCurrentUser = async () => {
  const session = await auth()
  if (!session?.user?.email) {
    return null
  }

  try {
    return await db.query.users.findFirst({
      where: eq(users.username, session.user.email),
    })
  } catch (error) {
    console.error("Error in getCurrentUser:", error)
    return null
  }
}
