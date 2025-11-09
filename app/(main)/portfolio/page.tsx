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
  achievements: string[];
};

type ProjectsTypes = {
  title: string;
  description: string;
};

export default function PortfolioPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 인증체크
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [router, status]);

  if (status === "loading") {
    return <p className="text-center mt-20 text-gray-500">로딩 중...</p>;
  }

  // 기술스택
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

  // 경력사항
  const experiences: ExperiencesTypes[] = [
    {
      company: "애니드림오토서비스",
      role: "프론트엔드 개발자",
      period: "2022.01 ~ 2024.07 (2년 7개월)",
      project: "추심관리 및 지급명령 시스템",
      stack: ["Next.js", "NextAuth", "Typescript", "GraphQL", "Tailwind CSS"],
      responsibilities: [
        "프론트엔드 전반 개발 (UI, 상태관리, 폼 검증 등)",
        "JWT 인증 및 Axios 인터셉터 기반 통신 구조 설계",
        "공통 컴포넌트화 (Input, Modal, Pagination 등)로 유지보수성 향상",
        "어드민 데이터 관리 UI (검색/정렬/페이지네이션) 구현",
        "사용자 입력 자동 저장 및 유효성 검증 로직 개발",
      ],
      achievements: [
        "공통 컴포넌트화로 코드 중복률 40% 감소",
        "어드민 UI 최적화로 데이터 처리 속도 개선",
        "UX 개선으로 업무 효율 향상 및 유지보수성 강화",
        "백엔드/디자인 협업을 통한 UX 개선 및 프로세스 효율화",
      ],
    },
    {
      company: "모빌리버스",
      role: "프론트엔드 개발자",
      period: "2024.08 ~ 2024.11 (3개월)",
      project: "추심관리 및 지급명령 시스템",
      stack: ["Next.js", "NextAuth", "Typescript", "GraphQL", "Tailwind CSS"],
      responsibilities: [
        "프론트엔드 전반 개발 (UI, 상태관리, 폼 검증 등)",
        "JWT 인증 및 Axios 인터셉터 기반 통신 구조 설계",
        "공통 컴포넌트화 (Input, Modal, Pagination 등)로 유지보수성 향상",
        "어드민 데이터 관리 UI (검색/정렬/페이지네이션) 구현",
        "사용자 입력 자동 저장 및 유효성 검증 로직 개발",
      ],
      achievements: [
        "공통 컴포넌트화로 코드 중복률 40% 감소",
        "어드민 UI 최적화로 데이터 처리 속도 개선",
        "UX 개선으로 업무 효율 향상 및 유지보수성 강화",
        "백엔드/디자인 협업을 통한 UX 개선 및 프로세스 효율화",
      ],
    },
  ];

  //   1) 프로젝트명: 모빌리버스 홈페이지 리뉴얼

  // - 연계/소속회사 : 모빌리버스

  // - 주요 업무 : 프론트엔드 담당

  // - 담당 역할 : 투자정보 메뉴 개발 및 전체적인 유지보수 후 배포

  // - 기술 스택 : - nextjs, typescript, tailwind css

  // - 업무 기간 : 2023.05.23 ~ 2023.06.09 (약 1개월)

  // - 개발 인원 : 5

  // - 상세 내용 : 기존에 호스팅 되어있던 모빌리버스 홈페이지를 자체 개발
  // 홈페이지 url : https://mobiliverse.co.kr/

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

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">경력</h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold text-lg text-gray-900">
                    {exp.role} | {exp.company}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 sm:mt-0">
                    {exp.period}
                  </p>
                </div>

                <div className="mt-3">
                  <h4 className="font-semibold">{exp.project}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    기술 스택: {exp.stack.join(", ")}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold">주요 역할</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                    {exp.responsibilities.map((res) => (
                      <li key={res}>{res}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold">성과</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                    {exp.achievements.map((ach) => (
                      <li key={ach}>{ach}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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
