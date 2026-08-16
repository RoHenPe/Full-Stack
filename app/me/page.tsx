import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "../services/session"
import { getUserReadingList } from "../services/blogs"
import { generateTokenAction } from "../actions/tokens"
import { markAsReadAction } from "../actions/blogs"

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const readingList = await getUserReadingList(user.id)
  const unreadBlogs = readingList.filter((item) => !item.read)
  const readBlogs = readingList.filter((item) => item.read)

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Profile Section */}
      <div data-testid="user-profile" className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-gray-700">Name: </span>
            <span data-testid="user-name">{user.name}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Username: </span>
            <span data-testid="user-username">{user.username}</span>
          </p>
        </div>
      </div>

      {/* Reading List Section */}
      <div data-testid="reading-list-section" className="bg-white p-6 rounded shadow space-y-6">
        <h3 className="text-xl font-bold">Reading List</h3>

        {readingList.length === 0 ? (
          <p data-testid="empty-reading-list" className="text-gray-500">
            Your reading list is empty.
          </p>
        ) : (
          <div className="space-y-6">
            {/* Unread Section */}
            <div data-testid="unread-section" className="space-y-3">
              <h4 className="font-semibold text-gray-800 border-b pb-1">Unread</h4>
              {unreadBlogs.length === 0 ? (
                <p data-testid="no-unread-blogs" className="text-gray-500 text-sm">
                  No unread blogs.
                </p>
              ) : (
                <ul className="space-y-2">
                  {unreadBlogs.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded bg-gray-50"
                    >
                      <div>
                        <Link
                          href={`/blogs/${item.blog.id}`}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          {item.blog.title}
                        </Link>{" "}
                        <span className="text-sm text-gray-500">by {item.blog.author}</span>
                      </div>
                      <form action={markAsReadAction}>
                        <input type="hidden" name="blogId" value={item.blog.id} />
                        <button
                          type="submit"
                          data-testid={`mark-read-${item.blog.id}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 font-medium transition-colors"
                        >
                          mark as read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Read Section */}
            {readBlogs.length > 0 && (
              <div data-testid="read-section" className="space-y-3">
                <h4 className="font-semibold text-gray-800 border-b pb-1">Read</h4>
                <ul className="space-y-2">
                  {readBlogs.map((item) => (
                    <li
                      key={item.id}
                      className="p-3 border rounded bg-gray-50 text-gray-600 flex items-center justify-between"
                    >
                      <div>
                        <Link
                          href={`/blogs/${item.blog.id}`}
                          className="text-gray-800 font-medium hover:underline"
                        >
                          {item.blog.title}
                        </Link>{" "}
                        <span className="text-sm text-gray-500">by {item.blog.author}</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded font-medium">
                        Read
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* API Token Section */}
      <div data-testid="api-token-section" className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="text-xl font-bold">API Token</h3>
        {user.token ? (
          <div data-testid="token-display" className="space-y-2">
            <p className="text-sm text-gray-600">Your personal API token:</p>
            <div className="p-3 bg-gray-100 rounded font-mono text-sm break-all border border-gray-200">
              <code data-testid="api-token">{user.token}</code>
            </div>
          </div>
        ) : (
          <p data-testid="no-token-message" className="text-gray-500">
            No API token generated yet.
          </p>
        )}

        <form action={generateTokenAction}>
          <button
            type="submit"
            data-testid="generate-token-button"
            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 font-medium transition-colors"
          >
            {user.token ? "Generate new token" : "Generate token"}
          </button>
        </form>
      </div>
    </div>
  )
}
