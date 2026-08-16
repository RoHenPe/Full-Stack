import Link from "next/link"
import { getBlogs } from "../services/blogs"

const BlogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Blogs</h2>

      <form method="GET" action="/blogs" className="mb-6 flex gap-2">
        <input
          type="text"
          name="filter"
          defaultValue={filter || ""}
          placeholder="Search by title..."
          className="border border-gray-300 rounded px-3 py-1.5"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 font-medium"
        >
          Search
        </button>
        {filter && (
          <Link
            href="/blogs"
            className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 flex items-center"
          >
            Clear
          </Link>
        )}
      </form>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul className="space-y-2">
          {blogs.map((blog) => (
            <li key={blog.id} className="border-b border-gray-200 pb-2">
              <Link
                href={`/blogs/${blog.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                {blog.title}
              </Link>{" "}
              by <span className="font-medium">{blog.author}</span> ({blog.likes} likes)
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BlogsPage
