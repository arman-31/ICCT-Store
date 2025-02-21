import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simplified example. In a real application, you would want to use
// proper session management and JWT tokens.
export function middleware(request: NextRequest) {
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin")
  const isAdminLoginPage = request.nextUrl.pathname === "/admin/login"

  // This is where you would actually verify the session/token
  const isAuthenticated = request.cookies.has("admin_session")

  if (isAdminPage) {
    if (!isAuthenticated && !isAdminLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    if (isAuthenticated && isAdminLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}