import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "Full Stack Open - Blogs",
  description: "Blog list app built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="p-6 font-sans antialiased text-gray-900 bg-gray-50">
        <header className="mb-6">
          <nav className="flex gap-4 border-b border-gray-200 pb-3">
            <Link href="/" className="font-semibold text-blue-600 hover:underline">
              home
            </Link>
            <span>|</span>
            <Link href="/blogs" className="font-semibold text-blue-600 hover:underline">
              blogs
            </Link>
            <span>|</span>
            <Link href="/blogs/new" className="font-semibold text-blue-600 hover:underline">
              create new
            </Link>
            <span>|</span>
            <Link href="/users" className="font-semibold text-blue-600 hover:underline">
              users
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
