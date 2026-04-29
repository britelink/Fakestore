import { NextRequest, NextResponse } from "next/server";

type ProductBody = {
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
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

    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, description, category, image }),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: "Unable to create product right now." },
        { status: response.status || 502 },
      );
    }

    return NextResponse.json({ product: data }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Unable to process product creation request right now." },
      { status: 500 },
    );
  }
}