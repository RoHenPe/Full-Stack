"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4 mb-6 rounded">
      <Link href="/" className="hover:text-gray-300 font-medium">
        home
      </Link>
      <Link href="/blogs" className="hover:text-gray-300 font-medium">
        blogs
      </Link>
      <Link href="/users" className="hover:text-gray-300 font-medium">
        users
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <Link href="/blogs/new" className="hover:text-gray-300 font-medium">
              create new
            </Link>
            <Link href="/me" className="hover:text-gray-300 font-medium">
              me
            </Link>
            <em className="text-gray-300 text-sm">{session.user?.name} logged in</em>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm transition-colors"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-gray-300 font-medium">
              login
            </Link>
            <Link href="/register" className="hover:text-gray-300 font-medium">
              register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
