"use client";

import { useRouter } from "next/navigation";

type Props = {
  userId: number;
};

export default function DeleteUserButton({ userId }: Props) {
  const { refresh } = useRouter();

  const deleteUser = () => {
    fetch(`/api/users?id=${userId}`, {
      method: "DELETE",
    })
      .then((value) => value.json())
      .then((result) => {
        console.log("=== result ===", result);
        refresh();
      });
  };

  return <button onClick={deleteUser}>Delete</button>;
}
