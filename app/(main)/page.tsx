"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-start flex-col px-6 text-center space-y-10">
      {/* 소개 */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">김봉준</h1>
        <p className="text-gray-600 text-base">
          프론트엔드 개발자 | 사용자 경험을 고민하는 UI 개발
        </p>
        <p className="text-gray-600 mb-8">
          Next.js · TypeScript · 인증 데모 프로젝트
        </p>
      </section>

      {/* CTA 버튼 */}
      <div className="mt-10 w-full max-w-64">
        <button
          onClick={() => router.push("/login")}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow-md transition hover:bg-blue-700"
        >
          로그인
        </button>
      </div>
    </main>
  );
}
