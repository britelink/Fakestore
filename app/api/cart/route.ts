import { NextRequest, NextResponse } from "next/server";

type CreateCartBody = {
  userId?: number;
  date?: string;
  products?: Array<{
    productId?: number;
    quantity?: number;
  }>;
};

export async function GET(req: NextRequest) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized. Please login first." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const limit = searchParams.get("limit");
  const sort = searchParams.get("sort");

  const isValidLimit = limit === null || /^\d+$/.test(limit);
  const isValidSort = sort === null || sort === "asc" || sort === "desc";
  const isValidUserId = userId === null || /^\d+$/.test(userId);

  if (!isValidLimit || !isValidSort || !isValidUserId) {
    return NextResponse.json(
      { message: "Invalid query params. Use userId:number, limit:number, sort:asc|desc." },
      { status: 400 },
    );
  }

  try {
    const endpoint = userId
      ? `https://fakestoreapi.com/carts/user/${userId}`
      : "https://fakestoreapi.com/carts";

    const upstreamUrl = new URL(endpoint);
    if (limit) upstreamUrl.searchParams.set("limit", limit);
    if (sort) upstreamUrl.searchParams.set("sort", sort);

    const response = await fetch(upstreamUrl.toString(), { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json(
        { message: "Upstream cart API returned an error." },
        { status: response.status || 502 },
      );
    }

    const data = await response.json();
    const carts = Array.isArray(data) ? data : [];
    return NextResponse.json({ carts }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error fetching carts." }, { status: 500 });
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

    const payload = (await req.json()) as CreateCartBody;
    const userId = payload?.userId;
    const date = typeof payload?.date === "string" ? payload.date : "";
    const products = Array.isArray(payload?.products) ? payload.products : [];

    const validProducts = products.every(
      (item) =>
        typeof item?.productId === "number" &&
        item.productId > 0 &&
        typeof item?.quantity === "number" &&
        item.quantity > 0,
    );

    if (typeof userId !== "number" || userId <= 0 || !date || products.length === 0 || !validProducts) {
      return NextResponse.json(
        {
          message:
            "Invalid body. Required: userId:number, date:string, products:[{productId:number, quantity:number}]",
        },
        { status: 400 },
      );
    }

    const response = await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        date,
        products: products.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      }),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: "Unable to create cart right now." },
        { status: response.status || 502 },
      );
    }

    return NextResponse.json({ cart: data }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Unable to process cart request right now." },
      { status: 500 },
    );
  }
}
