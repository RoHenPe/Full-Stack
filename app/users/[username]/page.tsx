import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserByUsernameWithBlogs } from "../../services/users"

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const user = await getUserByUsernameWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-600">Username: {user.username}</p>

      <h3 className="text-lg font-semibold mt-4">Blogs</h3>
      {!user.blogs || user.blogs.length === 0 ? (
        <p className="text-gray-500">No blogs added yet.</p>
      ) : (
        <ul className="space-y-2">
          {user.blogs.map((blog) => (
            <li key={blog.id} className="border-b border-gray-200 pb-2">
              <Link
                href={`/blogs/${blog.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                {blog.title}
              </Link>{" "}
              ({blog.likes} likes)
            </li>
          ))}
        </ul>
      )}

      <div className="pt-4">
        <Link href="/users" className="text-blue-600 hover:underline text-sm">
          ← Back to users
        </Link>
      </div>
    </div>
  )
}

export default UserPage
