import { NextResponse } from "next/server"
import { db } from "@/db"
import { readingList, blogs, users } from "@/db/schema"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 }
    )
  }

  if (process.env.DATABASE_URL) {
    try {
      await db.delete(readingList)
      await db.delete(blogs)
      await db.delete(users)
    } catch (error) {
      console.error("Error resetting database:", error)
      return NextResponse.json(
        { error: "Failed to reset database" },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ message: "Database reset successfully" })
}
