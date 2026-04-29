import { NextRequest, NextResponse } from "next/server";

type UpdateCartBody = {
  userId?: number;
  date?: string;
  products?: Array<{
    productId?: number;
    quantity?: number;
  }>;
};

function unauthorized() {
  return NextResponse.json(
    { message: "Unauthorized. Please login first." },
    { status: 401 },
  );
}

async function parseCartId(params: Promise<{ cartId: string }>) {
  const { cartId } = await params;
  if (!/^\d+$/.test(cartId)) return null;
  return cartId;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ cartId: string }> },
) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) return unauthorized();

  const cartId = await parseCartId(params);
  if (!cartId) {
    return NextResponse.json({ message: "Invalid cart ID." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch cart details." },
        { status: response.status || 502 },
      );
    }

    const cart = await response.json();
    if (!cart || typeof cart !== "object" || Array.isArray(cart)) {
      return NextResponse.json({ message: "Invalid cart response." }, { status: 502 });
    }

    return NextResponse.json({ cart }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error fetching cart details." }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ cartId: string }> },
) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) return unauthorized();

  const cartId = await parseCartId(params);
  if (!cartId) {
    return NextResponse.json({ message: "Invalid cart ID." }, { status: 400 });
  }

  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { message: "Content-Type must be application/json." },
        { status: 400 },
      );
    }

    const payload = (await req.json()) as UpdateCartBody;
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

    const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
      method: "PUT",
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
        { message: "Unable to update cart right now." },
        { status: response.status || 502 },
      );
    }

    return NextResponse.json({ cart: data }, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Unable to process cart update request right now." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ cartId: string }> },
) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  if (!token) return unauthorized();

  const cartId = await parseCartId(params);
  if (!cartId) {
    return NextResponse.json({ message: "Invalid cart ID." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: "Unable to delete cart right now." },
        { status: response.status || 502 },
      );
    }

    return NextResponse.json({ cart: data, deleted: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error deleting cart." }, { status: 500 });
  }
}
