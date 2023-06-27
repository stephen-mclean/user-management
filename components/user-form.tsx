"use client";

import { User, UserAPIType, isUserAPIType } from "@/models/user";
import { useRouter } from "next/navigation";
import Input from "./input";

type Props = {
  user?: User;
};

export default function UserForm({ user }: Props) {
  const { push } = useRouter();
  const isEditing = !!user;

  const getUserAPIData = (form: EventTarget & HTMLFormElement) => {
    const formElements = form.elements as typeof form.elements & {
      firstName: HTMLInputElement;
      lastName: HTMLInputElement;
      email: HTMLInputElement;
      companyName: HTMLInputElement;
      postalCode: HTMLInputElement;
    };

    const userAPIData: UserAPIType = {
      firstName: formElements.firstName.value,
      lastName: formElements.lastName.value,
      email: formElements.email.value,
      company: {
        name: formElements.companyName.value,
      },
      address: {
        postalCode: formElements.postalCode.value,
      },
    };

    return userAPIData;
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = getUserAPIData(form);

    const apiURL = isEditing ? `/api/users?id=${user.id}` : "/api/users";

    fetch(apiURL, {
      method: isEditing ? "PUT" : "POST",
      body: JSON.stringify(data),
    })
      .then((value) => value.json())
      .then((json) => {
        if (!isUserAPIType(json)) {
          throw new Error("Failed to parse user from response");
        }

        return new User(json);
      })
      .then((result) => {
        const action = isEditing ? "edited" : "added";
        push(`/?${action}=${result.fullName}`);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input
        name="firstName"
        label="First Name"
        type="text"
        defaultValue={user?.firstName}
        required
      />
      <Input
        name="lastName"
        label="Last Name"
        type="text"
        defaultValue={user?.lastName}
        required
      />
      <Input
        name="email"
        label="Email"
        type="email"
        defaultValue={user?.email}
        required
      />
      <Input
        name="companyName"
        label="Company Name"
        type="text"
        defaultValue={user?.companyName}
        required
      />
      <Input
        name="postalCode"
        label="Postal Code"
        type="text"
        defaultValue={user?.postalCode}
        required
        pattern="[0-9]{5}"
        hint="Please enter a 5 digit number e.g 20010"
      />
      <button
        className="bg-slate-600 text-white rounded p-1 mt-4"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
