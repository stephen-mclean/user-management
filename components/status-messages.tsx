"use client";

import { useSearchParams } from "next/navigation";
import Alert from "./alert";

export default function StatusMessages() {
  const searchParams = useSearchParams();
  // TODO: store the param keys in a constant
  // and use it where we add the params to the URL as well
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

  const statusMessage = getStatusMessage();

  return statusMessage && <Alert message={statusMessage} type="success" />;
}
