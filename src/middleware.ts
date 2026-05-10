import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const isPublicPath = pathname === "/"
  if(isPublicPath && accessToken){
      // Already logged in, no need to be on login page
    return NextResponse.redirect(new URL("/dashboard",request.url))
  }
  if( !isPublicPath && !accessToken){
        // Trying to access protected route without token
    return NextResponse.redirect(new URL("/",request.url))
  }
  // Everything else is allowed
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/dashboard/:path*"],
}
