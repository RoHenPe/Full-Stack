import Link from "next/link"

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog List App</h1>
      <p className="mb-2">
        An example app for{" "}
        <a
          href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Full Stack Open Next.js
        </a>
      </p>
      <p>
        Visit the{" "}
        <Link href="/blogs" className="text-blue-600 hover:underline">
          blogs list
        </Link>{" "}
        or{" "}
        <Link href="/blogs/new" className="text-blue-600 hover:underline">
          create a new blog
        </Link>
        .
      </p>
    </div>
  )
}

export default Home
