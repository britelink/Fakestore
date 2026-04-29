import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized. Please login first." },
      { status: 401 },
    );
  }

  try {
    const products = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });
    if (!products.ok) {
      return NextResponse.json(
        { message: "Upstream products API returned an error." },
        { status: products.status || 502 },
      );
    }

    const data = await products.json();
    const normalized = Array.isArray(data) ? data : [];

    return NextResponse.json(
      { message: "Products fetched successfully", products: normalized },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ message: "Error fetching products." }, { status: 500 });
  }
}