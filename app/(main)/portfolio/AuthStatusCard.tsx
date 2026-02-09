"use client";

import { useSession } from "next-auth/react";

const AuthStatusCard = () => {
  const { data: session, status } = useSession();

  const inAuth = status === "authenticated";

  const displayName = inAuth ? (session.user?.name ?? "User") : "Demo User";

  return (
    <>
      <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{displayName}</h2>
          <p className="text-sm text-gray-500">
            {inAuth
              ? "인증된 사용자로 로그인 상태입니다."
              : "로그인 없이 데모로 포트폴리오 확인 중입니다."}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium
          ${
            inAuth ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
          }`}
        >
          {inAuth ? "인증 완료" : "Demo 모드"}
        </span>
      </div>
    </>
  );
};

export default AuthStatusCard;
