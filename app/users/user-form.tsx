"use client";

import { User, UserAPIType } from "@/models/user";
import { useRouter } from "next/navigation";

type Props = {
  user?: User;
};

export default function UserForm({ user }: Props) {
  const { push } = useRouter();

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      firstName: HTMLInputElement;
      lastName: HTMLInputElement;
      email: HTMLInputElement;
      companyName: HTMLInputElement;
      postalCode: HTMLInputElement;
    };

    const userFormData: UserAPIType = {
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

    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userFormData),
    })
      .then((value) => value.json())
      .then((result) => {
        console.log("=== result ===", result);
        push("/");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        defaultValue={user?.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        defaultValue={user?.lastName}
      />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" defaultValue={user?.email} />
      <label htmlFor="companyName">Company Name</label>
      <input
        id="companyName"
        name="companyName"
        type="text"
        defaultValue={user?.companyName}
      />
      <label htmlFor="postalCode">Postal Code</label>
      <input
        id="postalCode"
        name="postalCode"
        type="text"
        defaultValue={user?.postalCode}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
