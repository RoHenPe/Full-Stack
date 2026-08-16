# Full-Stack Next.js (Full Stack Open)

Repository for Full Stack Open Next.js course: https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs

## Chapter 2 Exercises:
- **Exercise 1: Blog list** - Navigation bar, `/blogs` route rendering blog list with id, title, author, url, likes.
- **Exercise 2: New blog** - `/blogs/new` form and Server Action for creating blogs with `revalidatePath`.
- **Exercise 3: Blog page** - Dynamic route `/blogs/[id]` with blog details.
- **Exercise 4: Like button** - Server Action on individual blog page to increment likes with cache revalidation.
- **Exercise 5: Rendered in order** - Blogs list sorted in descending order by likes.
- **Exercise 6: Search** - Search feature filtering blogs by title using URL search parameters and Server Component.

## Chapter 3 Exercises:
- **Exercise 7: Deploy to Vercel** - Production deployment to Vercel.
- **Exercise 8: DrizzleORM and a database** - PostgreSQL schema with Drizzle ORM, migrations, and database services.
- **Exercise 9: Users** - Users table with relations to blogs, `/users` listing page, and navigation bar link.
- **Exercise 10: User page** - Individual user page at `/users/[username]` with Drizzle relation join (`with: { blogs: true }`).
