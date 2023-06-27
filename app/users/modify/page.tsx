"use client";

export default async function CreateModifyUser() {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(" ==== submit =====", event.currentTarget.elements);

    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ test: "here" }),
    }).then(() => {
      console.log(" === success ====");
    });
  };

  return (
    <main className="p-24">
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
