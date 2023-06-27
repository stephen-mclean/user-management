import StatusMessages from "@/components/status-messages";
import UserList from "@/components/user-list";
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
      <div className="flex flex-col gap-2">
        <StatusMessages />
        <div>
          <Link
            href={"/users/create"}
            className="bg-slate-600 text-white rounded p-1"
          >
            Add User
          </Link>
        </div>
        <UserList users={users} />
      </div>
    </>
  );
}
