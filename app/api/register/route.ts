import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { message: "Content-Type must be application/json." },
        { status: 400 },
      );
    }

    const payload = await req.json();
    const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
    const password = typeof payload?.password === "string" ? payload.password : "";
    const username =
      typeof payload?.username === "string" && payload.username.trim()
        ? payload.username.trim()
        : email.split("@")[0];

    if (!email || !password || !username) {
      return NextResponse.json(
        { message: "Email, username, and password are required." },
        { status: 400 },
      );
    }

    const fullName = typeof payload?.name === "string" ? payload.name.trim() : username;
    const [firstname, ...rest] = fullName.split(/\s+/).filter(Boolean);
    const lastname = rest.join(" ") || "user";

    const upstream = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        email,
        username,
        password,
        name: { firstname: firstname || username, lastname },
      }),
    });

    let data: unknown = null;
    try {
      data = await upstream.json();
    } catch {
      data = null;
    }

    if (!upstream.ok) {
      return NextResponse.json(
        { message: "Unable to register with Fake Store API right now." },
        { status: upstream.status || 502 },
      );
    }

    return NextResponse.json(
      {
        message: "Registered successfully in Fake Store API.",
        user: data,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Unable to process registration request right now." },
      { status: 500 },
    );
  }
}
