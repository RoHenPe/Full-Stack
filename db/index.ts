import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

export const db = drizzle(
  process.env.DATABASE_URL || "postgresql://placeholder:placeholder@ep-placeholder.neon.tech/neondb?sslmode=require",
  { schema }
)
