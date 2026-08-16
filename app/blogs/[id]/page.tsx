import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLike, addToReadingListAction } from "../../actions/blogs"
import { getCurrentUser } from "../../services/session"

const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const currentUser = await getCurrentUser()
  const isAuthor = currentUser && blog.userId && currentUser.id === blog.userId

  return (
    <div data-testid="blog-detail" className="bg-white p-6 rounded shadow space-y-4">
      <h2 data-testid="blog-title" className="text-2xl font-bold">
        {blog.title}
      </h2>
      <p data-testid="blog-author" className="text-gray-600">
        by <span className="font-semibold">{blog.author}</span>
      </p>

      <div>
        <p>
          <strong className="text-gray-700">URL: </strong>
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

      <div className="flex items-center gap-4 pt-2">
        <p className="font-medium text-gray-800">{blog.likes} likes</p>
        <form action={addLike}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 font-medium transition-colors"
          >
            like
          </button>
        </form>

        {currentUser && !isAuthor && (
          <form action={addToReadingListAction}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              type="submit"
              data-testid="add-to-reading-list-button"
              className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 font-medium transition-colors"
            >
              add to reading list
            </button>
          </form>
        )}
      </div>

      <div className="pt-4 border-t border-gray-100">
        <Link href="/blogs" className="text-blue-600 hover:underline text-sm font-medium">
          ← Back to blogs
        </Link>
      </div>
    </div>
  )
}

export default BlogPage
