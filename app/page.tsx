import { User, isUserNetworkType } from "@/models/user";

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
      if (isUserNetworkType(user)) {
        return new User(user.id, user.firstName, user.lastName);
      }
    });
  });
}

export default async function UsersList() {
  const users = await getUsers();

  return (
    <main className="p-24">
      {users.map((user) => (
        <div key={user.id}>{user.fullName}</div>
      ))}
    </main>
  );
}
