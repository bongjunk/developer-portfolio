import { redirect } from "next/navigation";
import { auth } from "../lib/auth/auth";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <p>로그인한 사용자만 볼 수 있는 페이지입니다.</p>
      <p>반갑습니다, {session.user?.name}님!</p>
    </div>
  );
}
