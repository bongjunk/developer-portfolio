"use client";

import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>로딩중...</p>;

  if (!session) return <p>로그인이 필요합니다.</p>;

  return (
    <>
      <p>안녕하세요! {session.user?.name}님!</p>
      <p>아이디: {session?.user.uid}</p>
      <p>이메일 : {session.user?.email}</p>
      {/* <img src={session.user?.image ?? ""} alt="프로필 이미지" width={40} /> */}
    </>
  );
}
