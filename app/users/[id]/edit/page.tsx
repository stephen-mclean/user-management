import { User, isUserAPIType } from "@/models/user";
import UserForm from "../../user-form";

async function getUser(id: number): Promise<User> {
  const res = await fetch(`https://dummyjson.com/users/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json().then((value) => {
    if (!value || !isUserAPIType(value)) {
      throw new Error("Failed to parse user");
    }

    return new User(value);
  });
}

export default async function EditUser({
  params: { id },
}: {
  params: { id: number };
}) {
  const user = await getUser(id);

  return (
    <main className="p-24">
      <h1>Edit User {user.fullName}</h1>
      <UserForm user={user} />
    </main>
  );
}
