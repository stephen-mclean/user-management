import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(" ===== create ======");
  const body = await request.json();

  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseBody = await res.json();

  return NextResponse.json(responseBody);
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const body = await request.json();

  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseBody = await res.json();

  return NextResponse.json(responseBody);
}
