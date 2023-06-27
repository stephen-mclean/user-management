"use client";

import { useSearchParams } from "next/navigation";

export default function StatusMessages() {
  const searchParams = useSearchParams();
  const added = searchParams?.get("added");
  const edited = searchParams?.get("edited");
  const deleted = searchParams?.get("deleted");

  const getStatusMessage = () => {
    if (added) {
      return `User ${added} added successfully`;
    }

    if (edited) {
      return `User ${edited} updated successfully`;
    }

    if (deleted) {
      return `User ${deleted} deleted successfully`;
    }
  };

  return <div>{getStatusMessage()}</div>;
}
