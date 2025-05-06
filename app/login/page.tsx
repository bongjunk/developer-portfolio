"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleLoginClick = async () => {
    await signIn("credentials", {
      username: "admin",
      password: "1234",
      callbackUrl: "/dashboard",
    });
  };

  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">로그인</h1>
      <button onClick={() => signIn("github")}>GitHub</button>
      <button onClick={handleLoginClick}>아이디/비번 로그인</button>
      <p>로그인 페이지 (나중에 GitHub, Google 로그인 버튼 추가 예정)</p>
    </main>
  );
}
