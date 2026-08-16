import { eq, desc, ilike, and } from "drizzle-orm"
import { db } from "../../db"
import { blogs, users, readingList } from "../../db/schema"
import { getCurrentUser } from "./session"

export type Blog = {
  id: number
  title: string
  author: string
  url: string
  likes: number
  userId?: number | null
}

export type ReadingListItem = {
  id: number
  userId: number
  blogId: number
  read: boolean
  blog: Blog
}

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
let fallbackReadingList: { id: number; userId: number; blogId: number; read: boolean }[] = []
let nextReadingListId = 1

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

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  userId?: number
) => {
  if (process.env.DATABASE_URL) {
    try {
      let creatorId = userId
      if (!creatorId) {
        const currentUser = await getCurrentUser()
        creatorId = currentUser?.id
      }

      if (!creatorId) {
        const firstUser = await db.query.users.findFirst()
        if (firstUser) {
          creatorId = firstUser.id
        } else {
          const [newUser] = await db
            .insert(users)
            .values({ username: "defaultuser", name: "Default User" })
            .returning()
          creatorId = newUser.id
        }
      }

      const [newBlog] = await db
        .insert(blogs)
        .values({
          title,
          author,
          url,
          likes: 0,
          userId: creatorId,
        })
        .returning()

      // Automatically add to creator's reading list
      if (creatorId && newBlog) {
        await db.insert(readingList).values({
          userId: creatorId,
          blogId: newBlog.id,
          read: false,
        })
      }

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
    userId: userId || 1,
  }
  fallbackBlogs.push(newBlog)
  fallbackReadingList.push({
    id: nextReadingListId++,
    userId: userId || 1,
    blogId: newBlog.id,
    read: false,
  })
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

export const addToReadingList = async (userId: number, blogId: number) => {
  if (process.env.DATABASE_URL) {
    try {
      const existing = await db.query.readingList.findFirst({
        where: and(
          eq(readingList.userId, userId),
          eq(readingList.blogId, blogId)
        ),
      })
      if (!existing) {
        await db.insert(readingList).values({
          userId,
          blogId,
          read: false,
        })
      }
      return
    } catch (error) {
      console.error("Error adding to reading list:", error)
    }
  }

  const exists = fallbackReadingList.find(
    (item) => item.userId === userId && item.blogId === blogId
  )
  if (!exists) {
    fallbackReadingList.push({
      id: nextReadingListId++,
      userId,
      blogId,
      read: false,
    })
  }
}

export const markAsRead = async (userId: number, blogId: number) => {
  if (process.env.DATABASE_URL) {
    try {
      await db
        .update(readingList)
        .set({ read: true })
        .where(
          and(eq(readingList.userId, userId), eq(readingList.blogId, blogId))
        )
      return
    } catch (error) {
      console.error("Error marking blog as read:", error)
    }
  }

  const item = fallbackReadingList.find(
    (i) => i.userId === userId && i.blogId === blogId
  )
  if (item) {
    item.read = true
  }
}

export const getUserReadingList = async (userId: number): Promise<ReadingListItem[]> => {
  if (process.env.DATABASE_URL) {
    try {
      const items = await db.query.readingList.findMany({
        where: eq(readingList.userId, userId),
        with: { blog: true },
      })
      return items as ReadingListItem[]
    } catch (error) {
      console.error("Error fetching reading list:", error)
    }
  }

  const items = fallbackReadingList.filter((item) => item.userId === userId)
  return items.map((item) => ({
    ...item,
    blog: fallbackBlogs.find((b) => b.id === item.blogId) || {
      id: item.blogId,
      title: "Unknown Blog",
      author: "Unknown",
      url: "#",
      likes: 0,
      userId: item.userId,
    },
  }))
}
