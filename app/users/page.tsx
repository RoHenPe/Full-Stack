import Link from "next/link"
import { getUsers } from "../services/users"

const UsersPage = async () => {
  const usersList = await getUsers()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {usersList.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-2">
          {usersList.map((user) => (
            <li key={user.id} className="border-b border-gray-200 pb-2">
              <Link
                href={`/users/${user.username}`}
                className="text-blue-600 font-medium hover:underline"
              >
                {user.name}
              </Link>{" "}
              <span className="text-gray-500 text-sm">(@{user.username})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UsersPage
