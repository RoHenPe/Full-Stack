import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLike } from "../../actions/blogs"

const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        {blog.title}{" "}
        <span className="text-lg font-normal text-gray-600">by {blog.author}</span>
      </h2>

      <div>
        <p>
          <strong>URL: </strong>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {blog.url}
          </a>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <p>
          <strong>{blog.likes}</strong> likes
        </p>
        <form action={addLike}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 font-medium"
          >
            like
          </button>
        </form>
      </div>

      <div className="pt-4">
        <Link href="/blogs" className="text-blue-600 hover:underline text-sm">
          ← Back to blogs
        </Link>
      </div>
    </div>
  )
}

export default BlogPage
