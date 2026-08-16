import type { Metadata } from "next"
import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import { NotificationProvider } from "./components/NotificationContext"
import NavBar from "./components/NavBar"
import Notification from "./components/Notification"

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
      <body className="min-h-screen p-6 font-sans antialiased text-gray-900 bg-gray-50 max-w-4xl mx-auto">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main>{children}</main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
