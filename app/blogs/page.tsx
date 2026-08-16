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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <Link
          href="/blogs/new"
          className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 font-medium"
        >
          Create new blog
        </Link>
      </div>

      <form method="GET" action="/blogs" className="flex gap-2">
        <input
          type="text"
          name="filter"
          data-testid="filter-input"
          defaultValue={filter || ""}
          placeholder="Search by title..."
          className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-sm bg-white"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 font-medium"
        >
          Search
        </button>
        {filter && (
          <Link
            href="/blogs"
            className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 flex items-center text-sm"
          >
            Clear
          </Link>
        )}
      </form>

      <div data-testid="blogs-list">
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          <ul className="space-y-3">
            {blogs.map((blog) => (
              <li
                key={blog.id}
                className="p-4 bg-white border border-gray-200 rounded shadow-sm hover:shadow transition-shadow flex items-center justify-between"
              >
                <div>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-blue-600 font-semibold text-lg hover:underline block"
                  >
                    {blog.title}
                  </Link>
                  <p className="text-gray-600 text-sm">
                    by <span className="font-medium">{blog.author}</span>
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {blog.likes} likes
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default BlogsPage
