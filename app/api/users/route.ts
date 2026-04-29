import { NextRequest, NextResponse } from "next/server";

type UserBody = {
  email?: string;
  username?: string;
  password?: string;
};

export async function GET(req: NextRequest) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized. Please login first." },
      { status: 401 },
    );
  }

  try {
    const response = await fetch("https://fakestoreapi.com/users", {
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json(
        { message: "Upstream users API returned an error." },
        { status: response.status || 502 },
      );
    }

    const data = await response.json();
    const users = Array.isArray(data) ? data : [];
    return NextResponse.json({ users }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error fetching users." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized. Please login first." },
      { status: 401 },
    );
  }

  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { message: "Content-Type must be application/json." },
        { status: 400 },
      );
    }

    const payload = (await req.json()) as UserBody;
    const email = typeof payload?.email === "string" ? payload.email.trim() : "";
    const username = typeof payload?.username === "string" ? payload.username.trim() : "";
    const password = typeof payload?.password === "string" ? payload.password.trim() : "";

    if (!email || !username || !password) {
      return NextResponse.json(
        { message: "Invalid body. Required: email:string, username:string, password:string" },
        { status: 400 },
      );
    }

    const response = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: "Unable to create user right now." },
        { status: response.status || 502 },
      );
    }

    return NextResponse.json({ user: data }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Unable to process user creation request right now." },
      { status: 500 },
    );
  }
}
