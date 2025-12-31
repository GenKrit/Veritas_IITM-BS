// middleware.ts(deprecated) but needed forr re routing

// veritas-website\middleware.ts
import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "veritas_admin_session";


export function middleware(req: NextRequest) {
  
  const { pathname } = req.nextUrl;

  // Only guard /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow login page always
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Read cookie (Edge-safe)
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value;
  // uncomment below code to check if middleware works
  console.log(`[Middleware] Path: ${pathname} | Cookie: ${sessionId ? 'YES' : 'NO'}`);

  // No cookie → redirect to login
  if (!sessionId) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Cookie exists → allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
