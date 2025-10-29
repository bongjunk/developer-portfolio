"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthStatusButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-4">
      {session ? (
        <>
          <p className="mb-2">👋 {session.user?.name}님 환영합니다!</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            로그아웃
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          로그인
        </button>
      )}
    </div>
  );
}
