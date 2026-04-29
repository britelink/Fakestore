import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized. Please login first." },
      { status: 401 },
    );
  }

  const { productId } = await params;
  if (!/^\d+$/.test(productId)) {
    return NextResponse.json({ message: "Invalid product ID." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch product details." },
        { status: response.status || 502 },
      );
    }

    const product = await response.json();
    if (!product || typeof product !== "object" || Array.isArray(product)) {
      return NextResponse.json({ message: "Invalid product response." }, { status: 502 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Error fetching product details." },
      { status: 500 },
    );
  }
}
