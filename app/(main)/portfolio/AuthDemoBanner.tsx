import { useRouter } from "next/navigation";

const AuthDemoBanner = () => {
  const router = useRouter();

  return (
    <>
      <section className="mb-12 rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔐</span>
            <h2 className="text-lg font-semibold text-blue-900">
              Authentication Demo Project
            </h2>
          </div>

          <p className="text-sm text-blue-800 leading-relaxed">
            이 포트폴리오는 <strong>NextAuth v5 기반 인증 흐름</strong>을
            보여주기 위한 데모 프로젝트입니다.
          </p>

          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>로그인 없이도 포트폴리오 확인 가능 (Demo User)</li>
            <li>로그인 시 세션 상태 및 보호된 UX 체험</li>
            <li>Middleware 기반 접근 제어 구현</li>
          </ul>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => router.push("/login")}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              인증 기능 체험하기
            </button>

            <span className="text-xs text-blue-700">
              ※ 실제 서비스용 로그인은 아닙니다
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthDemoBanner;
