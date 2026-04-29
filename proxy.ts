import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/products", "/playground", "/api"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("fakeStoreToken")?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && token) {
    const productsUrl = new URL("/products", req.url);
    return NextResponse.redirect(productsUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/playground/:path*", "/api/:path*", "/login"],
};
