import { NextRequest, NextResponse } from "next/server";

type ProductBody = {
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
};

function unauthorized() {
  return NextResponse.json(
    { message: "Unauthorized. Please login first." },
    { status: 401 },
  );
}

async function parseProductId(params: Promise<{ productId: string }>) {
  const { productId } = await params;
  if (!/^\d+$/.test(productId)) return null;
  return productId;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) return unauthorized();

  const productId = await parseProductId(params);
  if (!productId) {
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) return unauthorized();

  const productId = await parseProductId(params);
  if (!productId) {
    return NextResponse.json({ message: "Invalid product ID." }, { status: 400 });
  }

  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { message: "Content-Type must be application/json." },
        { status: 400 },
      );
    }

    const payload = (await req.json()) as ProductBody;
    const title = typeof payload?.title === "string" ? payload.title.trim() : "";
    const description =
      typeof payload?.description === "string" ? payload.description.trim() : "";
    const category = typeof payload?.category === "string" ? payload.category.trim() : "";
    const image = typeof payload?.image === "string" ? payload.image.trim() : "";
    const price = typeof payload?.price === "number" ? payload.price : NaN;

    if (!title || !description || !category || !image || Number.isNaN(price)) {
      return NextResponse.json(
        {
          message:
            "Invalid body. Required: title:string, price:number, description:string, category:string, image:string",
        },
        { status: 400 },
      );
    }

    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, description, category, image }),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: "Unable to update product right now." },
        { status: response.status || 502 },
      );
    }

    return NextResponse.json({ product: data }, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Unable to process product update request right now." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) return unauthorized();

  const productId = await parseProductId(params);
  if (!productId) {
    return NextResponse.json({ message: "Invalid product ID." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "DELETE",
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: "Unable to delete product right now." },
        { status: response.status || 502 },
      );
    }

    return NextResponse.json({ product: data, deleted: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error deleting product." }, { status: 500 });
  }
}
