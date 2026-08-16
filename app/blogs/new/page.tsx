import Link from "next/link"
import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create a new blog</h2>
      <form action={createBlog} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full border border-gray-300 rounded px-3 py-1.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            name="author"
            required
            className="w-full border border-gray-300 rounded px-3 py-1.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            type="url"
            name="url"
            required
            className="w-full border border-gray-300 rounded px-3 py-1.5"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
          >
            Create
          </button>
          <Link href="/blogs" className="text-gray-600 hover:underline text-sm">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default NewBlog
