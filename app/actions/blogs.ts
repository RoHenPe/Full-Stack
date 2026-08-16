"use server"

import { revalidatePath } from "next/cache"
import {
  addBlog,
  likeBlog,
  addToReadingList,
  markAsRead,
} from "../services/blogs"
import { getCurrentUser } from "../services/session"

export type BlogFormState = {
  errors?: {
    title?: string
    author?: string
    url?: string
    general?: string
  }
  values?: {
    title?: string
    author?: string
    url?: string
  }
  success?: boolean
}

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> => {
  const title = (formData.get("title") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const url = (formData.get("url") as string)?.trim()

  const errors: BlogFormState["errors"] = {}

  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }

  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }

  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
      success: false,
    }
  }

  try {
    const user = await getCurrentUser()
    await addBlog(title, author, url, user?.id)
    revalidatePath("/blogs")
    return { success: true }
  } catch (error) {
    console.error("Error creating blog:", error)
    return {
      errors: { general: "Failed to create blog" },
      values: { title, author, url },
      success: false,
    }
  }
}

export const addLike = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const addToReadingListAction = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"))
  const user = await getCurrentUser()
  if (user) {
    await addToReadingList(user.id, blogId)
    revalidatePath(`/blogs/${blogId}`)
    revalidatePath("/me")
  }
}

export const markAsReadAction = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"))
  const user = await getCurrentUser()
  if (user) {
    await markAsRead(user.id, blogId)
    revalidatePath("/me")
  }
}
