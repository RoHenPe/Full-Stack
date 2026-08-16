# Full-Stack Next.js (Full Stack Open)

Repository for Full Stack Open Next.js course: https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs

## Chapter 1 Exercises:
- **Exercise 0: Warm up** - Course introduction and guidelines.

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

## Chapter 4 Exercises:
- **Exercise 11: Login** - NextAuth.js authentication with Credentials provider and JWT session strategy.
- **Exercise 12: Registration** - User registration form at `/register` and password hashing with bcrypt.
- **Exercise 13: Validations in blog creation** - Server action validation using `useActionState`.
- **Exercise 14: Blog creation form on error** - Retain input values on validation error.
- **Exercise 15: Validations in user registration** - Password confirmation and username length validation.
- **Exercise 16: Styled notification with context** - React Context notification banner with Tailwind CSS.
- **Exercise 17: More styling** - Tailwind CSS styling applied to navbar, lists, forms, and pages.
- **Exercise 18: My page with API token access** - `/me` profile page with personal API token generator.
- **Exercise 19: API token access route** - `GET /api/me` authenticated via Bearer token.
- **Exercise 20: Reading list** - Automatic and manual reading list management.
- **Exercise 21: Better reading list** - Unread / Read grouped lists with mark as read button.
- **Exercise 22: Static homepage from markdown** - MDX homepage with `@next/mdx` and markdown styling.
- **Exercise 23: Finishing touches** - Testing API endpoints `DELETE /api/testing/reset` and `POST /api/testing/users`.
- **Exercise 24: Automated tests** - GitHub Actions workflow and Playwright test suite.
- **Exercise 25: GitHub repository** - Final submission repo: https://github.com/RoHenPe/Full-Stack
