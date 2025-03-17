import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_id")?.value; // Check session cookie

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no session
  }

  return NextResponse.next(); // Continue if session exists
}

export const config = {
  matcher: [
    "/:username/:file*",
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/protected/:path*",
  ],
};
