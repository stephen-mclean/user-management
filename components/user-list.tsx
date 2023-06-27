import { User } from "@/models/user";
import Link from "next/link";
import DeleteUserButton from "./delete-user-btn";

type Props = {
  users: User[];
};

export default function UserList({ users }: Props) {
  return (
    <table>
      <thead>
        <tr className="bg-slate-50 rounded sticky top-16">
          <th className="p-1">Name</th>
          <th className="p-1 max-sm:hidden">Email</th>
          <th className="p-1 max-sm:hidden">Company</th>
          <th className="p-1 max-sm:hidden">Postal Code</th>
          <th className="p-1">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="even:bg-slate-50 odd:bg-white">
            <td className="p-1">{user.fullName}</td>
            <td className="p-1 max-sm:hidden">{user.email}</td>
            <td className="p-1 max-sm:hidden">{user.companyName}</td>
            <td className="p-1 max-sm:hidden text-center">{user.postalCode}</td>
            <td className="p-1 justify-center flex gap-1">
              <Link href={`/users/${user.id}/edit`}>Edit</Link>
              {user.id && <DeleteUserButton userId={user.id} />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
