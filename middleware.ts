import { auth } from "@/lib/auth/auth";
import { Session } from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * ✅ NextRequest 확장 타입
 * auth()가 주입하는 req.auth 타입을 명시
 */
interface ExtendedNextRequest extends NextRequest {
  auth?: Session | null;
}

// auth()는 middleware 함수 전체를 감싸는 역할만 함
export default auth((req: ExtendedNextRequest) => {
  const { nextUrl } = req;
  const protectedPaths = ["/portfolio"];

  const isProtected = protectedPaths.some((path) =>
    nextUrl.pathname.startsWith(path)
  );

  // req.auth 대신 req.auth 사용 ❌ -> 아래처럼 auth가 전달됨
  // auth() 함수가 인증 객체를 첫 번째 인자로 넘겨줌
  if (!auth && isProtected) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portfolio/:path*"],
};
