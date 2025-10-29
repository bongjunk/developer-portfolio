"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

type ExperiencesTypes = {
  company: string;
  role: string;
  period: string;
  project: string;
  stack: string[];
  responsibilities: string[];
  achivements: string[];
};

type ProjectsTypes = {
  title: string;
  description: string;
};

export default function PortfolioPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [router, status]);

  if (status === "loading") {
    return <p className="text-center mt-20 text-gray-500">로딩 중...</p>;
  }

  const skills: string[] = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Styled-Components",
    "Node.js",
    "NextAuth",
    "GraphQL",
    "Zod",
  ];

  const experiences: ExperiencesTypes = [
    {
      company: "모빌리버스",
      role: "프론트엔드 개발자",
      period: "2022.01 ~ 2024.11 (2년 10개월)",
      project: "추심관리 및 지급명령 시스템",
      stack: ["Next.js", "NextAuth", "Typescript", "GraphQL", "Tailwind CSS"],
      responsibilities: [
        "프론트엔드 전반 개발 (UI, 상태관리, 폼 검증 등)",
        "JWT 인증 및 Axios 인터셉터 기반 통신 구조 설계",
        "공통 컴포넌트화 (Input, Modal, Pagination 등)로 유지보수성 향상",
        "어드민 데이터 관리 UI (검색/정렬/페이지네이션) 구현",
        "사용자 입력 자동 저장 및 유효성 검증 로직 개발",
      ],
      achivements: [
        "공통 컴포넌트화로 코드 중복률 40% 감소",
        "어드민 UI 최적화로 데이터 처리 속도 개선",
        "UX 개선으로 업무 효율 향상 및 유지보수성 강화",
        "백엔드/디자인 협업을 통한 UX 개선 및 프로세스 효율화",
      ],
    },
    {
      company: "개인 프로젝트",
      role: "프론트엔드 개발",
      period: "2025.02 ~ 진행 중",
      project: "Next.js 인증 데모 & 포트폴리오 사이트",
      stack: ["Next.js", "NextAuth", "Prisma", "Tailwind CSS"],
      responsibilities: [
        "NextAuth v5 + Credentials/GitHub 로그인 구현",
        "회원가입 폼 유효성 검사 및 사용자 DB 저장",
        "보호 라우트 및 세션 기반 접근제어 구현",
        "Tailwind 기반 UI 컴포넌트 제작",
      ],
      achievements: [
        "App Router 기반 인증 로직 완성",
        "Vercel 배포 자동화 환경 구축 예정",
      ],
    },
  ];

  const projects: ProjectsTypes[] = [
    {
      title: "포트폴리오 웹사이트",
      description: "Next.js + Tailwind 기반 반응형 개인 포트폴리오",
    },
    {
      title: "인증 데모 프로젝트",
      description: "NextAuth v5로 GitHub 및 Credentials 로그인 구현",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* 소개 */}
        <section className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            김봉준
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            프론트엔드 개발자 | 사용자 경험을 고민하는 UI 개발
          </p>
        </section>

        {/* 기술 스택 */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            기술 스택
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm text-sm text-gray-800 hover:bg-gray-100 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* 경력 */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">경력</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-gray-900">모빌리버스</h3>
            <p className="text-sm text-gray-600 mt-1">
              프론트엔드 개발자 (2년 10개월)
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-3 space-y-1">
              <li>Next.js 기반 사내 관리 시스템 UI 개발</li>
              <li>React + TypeScript 컴포넌트 리팩토링</li>
              <li>Tailwind 도입으로 디자인 시스템 개선</li>
              <li>NextAuth 인증 로직 및 세션 관리 구현</li>
            </ul>
          </div>
        </section>

        {/* 경력 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">경력 요약</h2>
          <div className="rounded-lg border bg-white p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-lg">
                프론트엔드 개발자 | (모빌리버스)
              </h3>
              <p className="text-sm text-gray-500">
                2022.01 ~ 2024.11 (2년 10개월)
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">추심관리 및 지급명령 시스템</h4>
              <p className="text-sm text-gray-600">
                React + TypeScript 기반의 어드민/클라이언트 웹 구축 프로젝트
              </p>
            </div>

            <div>
              <h4 className="font-semibold mt-3">주요 역할</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>프론트엔드 전반 개발 주도 (UI, 상태관리, 폼 검증 등)</li>
                <li>JWT 인증 및 Axios 인터셉터 기반 통신 구조 설계</li>
                <li>
                  공통 컴포넌트화 (Input, Modal, Pagination 등)로 유지보수성
                  향상
                </li>
                <li>어드민 데이터 관리 UI (검색/정렬/페이지네이션) 구현</li>
                <li>사용자 입력 자동 저장 및 유효성 검증 로직 개발</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mt-3">성과</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>공통 컴포넌트화로 코드 중복률 40% 감소</li>
                <li>입력 자동저장 기능 도입으로 사용자 에러율 감소</li>
                <li>어드민 UI 최적화로 데이터 처리 속도 개선</li>
                <li>백엔드/디자인 협업을 통한 UX 개선 및 프로세스 효율화</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 프로젝트 */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">프로젝트</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((proj) => (
              <div
                key={proj.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <h3 className="font-bold text-gray-900">{proj.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
