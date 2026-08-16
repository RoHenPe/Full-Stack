export type Blog = {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: 2,
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: 3,
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const addBlog = (title: string, author: string, url: string) => {
  const newBlog: Blog = {
    id: nextId++,
    title,
    author,
    url,
    likes: 0,
  }
  blogs.push(newBlog)
  return newBlog
}

export const likeBlog = (id: number) => {
  const blog = blogs.find((b) => b.id === id)
  if (blog) {
    blog.likes += 1
  }
}
