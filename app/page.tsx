"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center flex-col max-w-3xl mx-auto px-4 py-20 text-center space-y-10">
      {/* 소개 */}
      <section className="text-center space-y-4">
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

// export default function LandingPage() {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
// {/* 간단한 소개 */}
// <h1 className="text-4xl font-bold mb-4">김봉준</h1>
// <p className="text-gray-600 mb-8">
//   프론트엔드 개발자 | Next.js 기반 인증 데모 프로젝트
// </p>

// {/* 로그인 버튼 */}
// <a
//   href="/login"
//   className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
// >
//   로그인하기
// </a>
// <div className="flex flex-col gap-3">
//   <a href="/login?method=github" className="btn bg-gray-800 text-white">
//     GitHub 로그인
//   </a>
//   <a
//     href="/login?method=credentials"
//     className="btn bg-blue-600 text-white"
//   >
//     아이디/비밀번호 로그인
//   </a>
// </div>
//     </main>
//   );
// }
