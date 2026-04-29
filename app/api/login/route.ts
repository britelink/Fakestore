import { NextRequest, NextResponse } from "next/server";

type LoginBody = {
  username?: string;
  password?: string;
};

export async function POST(req: NextRequest) {
  try {
    console.log("[login] request received");
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      console.log("[login] invalid content-type:", contentType);
      return NextResponse.json(
        { message: "Content-Type must be application/json." },
        { status: 400 },
      );
    }

    let parsedBody: unknown;
    try {
      parsedBody = await req.json();
    } catch {
      console.log("[login] invalid JSON body");
      return NextResponse.json(
        { message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    const body =
      parsedBody && typeof parsedBody === "object" && !Array.isArray(parsedBody)
        ? (parsedBody as LoginBody)
        : null;

    if (!body) {
      console.log("[login] body is not an object");
      return NextResponse.json(
        { message: "Request body must be a JSON object." },
        { status: 400 },
      );
    }

    const username = typeof body.username === "string" ? body.username.trim() : "";
    const password = typeof body.password === "string" ? body.password.trim() : "";
    console.log("[login] parsed credentials", {
      username,
      usernameLength: username.length,
      passwordLength: password.length,
      hasLeadingOrTrailingSpaces:
        typeof body.password === "string" ? body.password !== body.password.trim() : false,
    });

    if (!username || !password) {
      console.log("[login] missing username or password");
      return NextResponse.json(
        { message: "Username and password are required." },
        { status: 400 },
      );
    }

    const authResponse = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
    console.log("[login] upstream response status", authResponse.status);

    let data: unknown = null;
    try {
      data = await authResponse.json();
    } catch {
      data = null;
    }
    console.log("[login] upstream response body", data);

    const token =
      data && typeof data === "object" && "token" in data && typeof data.token === "string"
        ? data.token
        : "";

    if (!authResponse.ok || !token) {
      console.log("[login] auth failed", {
        ok: authResponse.ok,
        hasToken: Boolean(token),
      });
      return NextResponse.json(
        { message: "Invalid username or password." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true }, { status: 200 });
    console.log("[login] auth success, setting cookie");
    response.cookies.set("fakeStoreToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.log("[login] unexpected error", error);
    return NextResponse.json(
      { message: "Unable to process login request right now." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set("fakeStoreToken", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
