"use client";

import { User, isUserAPIType } from "@/models/user";
import { useRouter } from "next/navigation";

type Props = {
  userId: number;
};

export default function DeleteUserButton({ userId }: Props) {
  const { push } = useRouter();

  const deleteUser = () => {
    fetch(`/api/users?id=${userId}`, {
      method: "DELETE",
    })
      .then((value) => value.json())
      .then((json) => {
        if (!isUserAPIType(json)) {
          throw new Error("Failed to parse user from response");
        }

        return new User(json);
      })
      .then((result) => {
        push(`/?deleted=${result.fullName}`);
      });
  };

  return <button onClick={deleteUser}>Delete</button>;
}
