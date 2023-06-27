import { User, isUserAPIType } from "@/models/user";
import Link from "next/link";

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://dummyjson.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json().then((value) => {
    if (!value.users) {
      throw new Error("Failed to parse data");
    }

    return value.users.map((user: any) => {
      if (isUserAPIType(user)) {
        return new User(user);
      }
    });
  });
}

export default async function UsersList() {
  const users = await getUsers();

  return (
    <>
      <Link
        href={"/users/create"}
        className="bg-slate-600 text-white rounded p-1"
      >
        Add User
      </Link>
      <div className="flex justify-center">
        <table>
          <thead>
            <tr className="bg-slate-50 rounded sticky top-16">
              <th className="p-1">Name</th>
              <th className="p-1">Email</th>
              <th className="p-1">Company</th>
              <th className="p-1">Postal Code</th>
              <th className="p-1">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="even:bg-slate-50 odd:bg-white">
                <td className="p-1">{user.fullName}</td>
                <td className="p-1">{user.email}</td>
                <td className="p-1">{user.companyName}</td>
                <td className="p-1">{user.postalCode}</td>
                <td>
                  <Link href={`/users/${user.id}/edit`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
