import db from "@/lib/db";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 },
      );
    }

    const existingUser = await db.query(
      'SELECT id FROM "User" WHERE email = $1 LIMIT 1',
      [email],
    );
    if (existingUser.rowCount && existingUser.rowCount > 0) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 },
      );
    }

    const createdUser = await db.query(
      'INSERT INTO "User" (id, email, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id, email, "createdAt"',
      [randomUUID(), email, password],
    );

    const user = createdUser.rows[0];

    return NextResponse.json(
      { user, message: "User created successfully" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }
}


