import { NextRequest, NextResponse } from "next/server";

 export async function GET(req: NextRequest) {
    const token = req.cookies.get("fakeStoreToken")?.value;
    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized. Please login first." },
            { status: 401 },
        );
    }

    try{
        const products = await fetch('https://fakestoreapi.com/products');
        const data = await products.json();

        return NextResponse.json({ message: "Products fetched successfully", products: data }, { status: 200 });
    }
    catch{
        return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
    }

}