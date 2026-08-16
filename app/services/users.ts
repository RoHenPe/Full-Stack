import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"
import { Blog, getBlogs } from "./blogs"

export type User = {
  id: number
  username: string
  name: string
}

export type UserWithBlogs = User & {
  blogs: Blog[]
}

const fallbackUsers: User[] = [
  {
    id: 1,
    username: "mluukkai",
    name: "Matti Luukkainen",
  },
  {
    id: 2,
    username: "hellas",
    name: "Arto Hellas",
  },
]

export const getUsers = async (): Promise<User[]> => {
  if (process.env.DATABASE_URL) {
    try {
      return await db.query.users.findMany()
    } catch (error) {
      console.error("Database query failed in getUsers, using fallback:", error)
    }
  }

  return fallbackUsers
}

export const getUserByUsernameWithBlogs = async (
  username: string
): Promise<UserWithBlogs | undefined> => {
  if (process.env.DATABASE_URL) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.username, username),
        with: { blogs: true },
      })
      if (user) return user as UserWithBlogs
    } catch (error) {
      console.error("Database query failed in getUserByUsernameWithBlogs, using fallback:", error)
    }
  }

  const user = fallbackUsers.find((u) => u.username === username)
  if (!user) return undefined

  const allBlogs = await getBlogs()
  const userBlogs = allBlogs.filter((b) => b.userId === user.id)

  return {
    ...user,
    blogs: userBlogs,
  }
}

export const getUserById = async (id: number): Promise<User | undefined> => {
  if (process.env.DATABASE_URL) {
    try {
      return await db.query.users.findFirst({
        where: eq(users.id, id),
      })
    } catch (error) {
      console.error("Database query failed in getUserById, using fallback:", error)
    }
  }

  return fallbackUsers.find((u) => u.id === id)
}
