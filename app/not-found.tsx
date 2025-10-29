import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-500 mb-8">요청하신 페이지가 존재하지 않습니다.</p>

      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}

// 이전 페이지로 돌아가기 버전
// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function NotFoundPage() {
//   const router = useRouter();

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
//       <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
//       <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//         페이지를 찾을 수 없습니다
//       </h2>
//       <p className="text-gray-500 mb-8">
//         요청하신 페이지가 존재하지 않거나 이동되었어요.
//       </p>

//       <div className="flex space-x-4">
//         <Link
//           href="/"
//           className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
//         >
//           홈으로 돌아가기
//         </Link>
//         <button
//           onClick={() => router.back()}
//           className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
//         >
//           이전 페이지로 돌아가기
//         </button>
//       </div>
//     </main>
//   );
// }
