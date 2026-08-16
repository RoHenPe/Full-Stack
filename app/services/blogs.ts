import { eq, desc, ilike, sql } from "drizzle-orm"
import { db } from "../../db"
import { blogs, users } from "../../db/schema"

export type Blog = {
  id: number
  title: string
  author: string
  url: string
  likes: number
  userId?: number | null
}

// Fallback in-memory data if database is not configured
let fallbackBlogs: Blog[] = [
  {
    id: 1,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    userId: 1,
  },
  {
    id: 2,
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    userId: 1,
  },
  {
    id: 3,
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    userId: 1,
  },
]
let nextFallbackId = 4

export const getBlogs = async (filter?: string): Promise<Blog[]> => {
  if (process.env.DATABASE_URL) {
    try {
      if (filter) {
        return await db.query.blogs.findMany({
          where: ilike(blogs.title, `%${filter}%`),
          orderBy: [desc(blogs.likes)],
        })
      }
      return await db.query.blogs.findMany({
        orderBy: [desc(blogs.likes)],
      })
    } catch (error) {
      console.error("Database query failed in getBlogs, using fallback:", error)
    }
  }

  const sorted = [...fallbackBlogs].sort((a, b) => b.likes - a.likes)
  if (filter) {
    return sorted.filter((b) =>
      b.title.toLowerCase().includes(filter.toLowerCase())
    )
  }
  return sorted
}

export const getBlogById = async (id: number): Promise<Blog | undefined> => {
  if (process.env.DATABASE_URL) {
    try {
      return await db.query.blogs.findFirst({
        where: eq(blogs.id, id),
      })
    } catch (error) {
      console.error("Database query failed in getBlogById, using fallback:", error)
    }
  }

  return fallbackBlogs.find((b) => b.id === id)
}

export const addBlog = async (title: string, author: string, url: string) => {
  if (process.env.DATABASE_URL) {
    try {
      let user = await db.query.users.findFirst({
        orderBy: sql`RANDOM()`,
      })

      if (!user) {
        const [createdUser] = await db
          .insert(users)
          .values({
            username: "mluukkai",
            name: "Matti Luukkainen",
          })
          .returning()
        user = createdUser
      }

      const [newBlog] = await db
        .insert(blogs)
        .values({
          title,
          author,
          url,
          likes: 0,
          userId: user?.id,
        })
        .returning()

      return newBlog
    } catch (error) {
      console.error("Database insert failed in addBlog, using fallback:", error)
    }
  }

  const newBlog: Blog = {
    id: nextFallbackId++,
    title,
    author,
    url,
    likes: 0,
    userId: 1,
  }
  fallbackBlogs.push(newBlog)
  return newBlog
}

export const likeBlog = async (id: number) => {
  if (process.env.DATABASE_URL) {
    try {
      const blog = await getBlogById(id)
      if (blog) {
        await db
          .update(blogs)
          .set({ likes: blog.likes + 1 })
          .where(eq(blogs.id, id))
        return
      }
    } catch (error) {
      console.error("Database update failed in likeBlog, using fallback:", error)
    }
  }

  const blog = fallbackBlogs.find((b) => b.id === id)
  if (blog) {
    blog.likes += 1
  }
}
