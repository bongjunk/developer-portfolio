"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleLoginClick = async () => {
    await signIn("credentials", {
      uid: "admin",
      password: "1234",
      callbackUrl: "/dashboard",
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl font-bold mb-4">로그인</p>
        <button onClick={() => signIn("github")}>GitHub</button>
        <button onClick={handleLoginClick}>아이디/비번 로그인</button>
      </div>
    </>
  );
}
