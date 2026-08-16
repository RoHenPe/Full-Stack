import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 }
    )
  }

  try {
    const body = await req.json()
    const { username, name, password } = body

    if (!username || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    if (process.env.DATABASE_URL) {
      const [newUser] = await db
        .insert(users)
        .values({
          username,
          name,
          passwordHash,
        })
        .returning()

      return NextResponse.json(newUser, { status: 201 })
    }

    return NextResponse.json(
      { id: 999, username, name },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating test user:", error)
    return NextResponse.json(
      { error: "Failed to create test user" },
      { status: 500 }
    )
  }
}
