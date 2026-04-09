import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

const AUTH_PATHS = ["/login", "/register"];
const REDIRECT_LOGIN_PATH = "/portfolio";

export default auth((req) => {
  const { nextUrl, auth: session } = req;

  const isAuthPage = AUTH_PATHS.some((path) =>
    nextUrl.pathname.startsWith(path),
  );

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL(REDIRECT_LOGIN_PATH, req.url));
  }

  return;
});

export const config = {
  matcher: ["/login/:path*", "/register/:path*"],
};
