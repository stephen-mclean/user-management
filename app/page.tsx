import { User, isUserAPIType } from "@/models/user";

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
    <main className="p-24">
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
          <th>Postal Code</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.companyName}</td>
            <td>{user.postalCode}</td>
          </tr>
        ))}
      </table>
    </main>
  );
}
