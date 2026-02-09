import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const authPaths = ["/login", "/register"];

  const isAuthPage = authPaths.some((path) =>
    nextUrl.pathname.startsWith(path),
  );

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/portfolio", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login/:path*", "/register/:path*"],
};
