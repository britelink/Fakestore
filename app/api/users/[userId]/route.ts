import { NextRequest, NextResponse } from "next/server";

type UserBody = {
  email?: string;
  username?: string;
  password?: string;
};

function unauthorized() {
  return NextResponse.json(
    { message: "Unauthorized. Please login first." },
    { status: 401 },
  );
}

async function parseUserId(params: Promise<{ userId: string }>) {
  const { userId } = await params;
  if (!/^\d+$/.test(userId)) return null;
  return userId;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) return unauthorized();

  const userId = await parseUserId(params);
  if (!userId) {
    return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch user details." },
        { status: response.status || 502 },
      );
    }

    const user = await response.json();
    if (!user || typeof user !== "object" || Array.isArray(user)) {
      return NextResponse.json({ message: "Invalid user response." }, { status: 502 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error fetching user details." }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) return unauthorized();

  const userId = await parseUserId(params);
  if (!userId) {
    return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
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

    const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: "Unable to update user right now." },
        { status: response.status || 502 },
      );
    }

    return NextResponse.json({ user: data }, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Unable to process user update request right now." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) return unauthorized();

  const userId = await parseUserId(params);
  if (!userId) {
    return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
      method: "DELETE",
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: "Unable to delete user right now." },
        { status: response.status || 502 },
      );
    }

    return NextResponse.json({ user: data, deleted: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error deleting user." }, { status: 500 });
  }
}
