"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const { status } = useSession();

  return (
    <main className="flex items-center justify-start flex-col px-4 text-center space-y-10">
      <section className="rounded-xl border border-blue-200 bg-blue-50 px-6 py-4 text-sm text-blue-800">
        <strong className="block font-semibold mb-1">
          🔐 인증 데모 프로젝트
        </strong>
        <p className="leading-relaxed">
          이 포트폴리오는 <b>NextAuth v5 기반 인증 흐름</b>을 보여주기 위한 데모
          프로젝트입니다. <br />
          로그인 없이도 내용을 확인할 수 있으며, 로그인 시
          <b> 보호 라우트 / 세션 UX</b>를 체험할 수 있습니다.
        </p>
      </section>
      {/* 소개 */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900">김봉준</h1>

        <p className="text-gray-700 text-lg">
          프론트엔드 개발자 · 실무 흐름을 설계하는 UI 개발
        </p>

        <p className="text-gray-500">Next.js · TypeScript · NextAuth</p>
      </section>
      {/* CTA 버튼 */}
      <section className="space-y-4">
        <button
          onClick={() => router.push("/login")}
          className="mx-auto block rounded-lg bg-blue-600 px-8 py-3 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        >
          로그인
        </button>
        <p className="text-xs mt-3 text-gray-500">
          ※ 로그인은 인증 데모 체험용입니다.
        </p>
      </section>
    </main>
  );
}
