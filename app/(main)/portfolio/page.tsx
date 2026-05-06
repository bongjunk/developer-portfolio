"use client";

import { useSession } from "next-auth/react";
import AuthDemoBanner from "./AuthDemoBanner";
import AuthStatusCard from "./AuthStatusCard";

type ExperiencesTypes = {
  id: string;
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
  const { status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-20 text-gray-500">로딩 중...</p>;
  }

  // 기술스택
  const skills: string[] = [
    "Next.js",
    "React",
    "TypeScript",
    "NextAuth",
    "JWT / Session",
    "React Hook Form",
    "Zod",
    "Tailwind CSS",
    "Styled-Components",
    "SCSS",
    "Node.js",
    "GraphQL",
    "Recoil",
    "Git",
  ];

  // 경력사항
  const experiences: ExperiencesTypes[] = [
    {
      id: "mobiliverse-gama-admin",
      company: "모빌리버스",
      role: "프론트엔드 개발자",
      period: "2024.08 ~ 2024.11",
      project: "차량관리 ERP(GAMA) 어드민 페이지 프론트엔드 개발",
      stack: [
        "Next.js",
        "NextAuth",
        "Typescript",
        "React Hook Form",
        "GraphQL",
        "Recoil",
        "Tailwind CSS",
        "Zod",
      ],
      responsibilities: [
        "Next.js 기반 어드민 UI 개발 및 유지보수",
        "추심관리 메뉴 UI 및 데이터 처리 로직 개발",
        "API 연동을 통한 데이터 조회/등록/수정(CRUD) 화면 구현",
        "NextAuth 기반 로그인/세션 처리 및 보호 페이지 접근 제어 구현",
        "React Hook Form과 TypeScript 기반 폼 데이터 구조 설계",
      ],
      achievements: [
        "데이터 관리 화면 중심의 어드민 UX를 안정적으로 제공하며 운영 요구사항 반영",
        "기존 코드 구조 개선과 공통 컴포넌트 분리를 통해 재사용성 및 유지보수성 향상",
        "운영 메뉴 단위 기능 개발을 통해 실제 서비스 유지보수 및 배포 경험 확보",
      ],
    },
    {
      id: "anydream-gama-service",
      company: "애니드림오토서비스",
      role: "프론트엔드 개발자",
      period: "2022.01 ~ 2024.08",
      project: "차량관리 ERP(GAMA) 서비스 및 운영 메뉴 프론트엔드 개발",
      stack: [
        "Next.js",
        "NextAuth",
        "Typescript",
        "GraphQL",
        "Recoil",
        "React Hook Form",
        "Tailwind CSS",
        "Zod",
      ],
      responsibilities: [
        "차량관리 ERP(GAMA) 서비스 프론트엔드 개발",
        "API 연동 기반 데이터 조회/등록/수정(CRUD) 화면 구현",
        "고객센터 등 운영 메뉴 기능 개발 및 유지보수",
        "메뉴 단위 UI 및 상태 관리 로직 구현",
        "기존 서비스 UI 개선 및 코드 리팩토링",
        "React Hook Form과 TypeScript 기반 폼 데이터 구조 설계",
      ],
      achievements: [
        "데이터 관리 화면 중심의 어드민 UX를 안정적으로 제공하며 운영 요구사항 반영",
        "기존 코드 구조 개선과 공통 컴포넌트 분리를 통해 재사용성 및 유지보수성 향상",
        "운영 메뉴 단위 기능 개발을 통해 사내 테스트 서비스 유지보수 및 배포 경험 확보",
      ],
    },
    {
      id: "anydream-homepage-renewal",
      company: "애니드림오토서비스",
      role: "프론트엔드 개발자",
      period: "2023.05.23 ~ 2023.06.09",
      project: "사내 홈페이지 리뉴얼",
      stack: ["Next.js", "Typescript", "Tailwind CSS"],
      responsibilities: [
        "기존 투자정보 메뉴 UI 리뉴얼",
        "페이지 및 컴포넌트 유지보수",
        "운영 배포 대응",
      ],
      achievements: [
        "기존 페이지 구조를 개선하여 콘텐츠 전달력과 유지보수성을 향상",
        "실제 서비스 반영 및 운영 배포 경험",
        "홈페이지: mobiliverse.co.kr",
      ],
    },
  ];

  const projects: ProjectsTypes[] = [
    {
      title: "NextAuth 기반 인증 포트폴리오",
      description:
        "Next.js App Router 환경에서 Credentials/GitHub OAuth 로그인, JWT/Session 커스터마이징, middleware(proxy) 기반 접근 제어를 구현한 포트폴리오 프로젝트",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 pb-24">
      <AuthDemoBanner />
      <AuthStatusCard />
      <div className="max-w-4xl mx-auto space-y-12 pt-16">
        {/* 소개 */}
        <section className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            김봉준
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            프론트엔드 개발자 · 실무 흐름을 구현하는 UI 개발
          </p>
          <p className="text-sm text-gray-500">
            Next.js · TypeScript · UI/UX · Authentication
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
          <div className="space-y-3">
            {experiences?.slice(0, 2).map((exp) => (
              <div
                key={`${exp.company}-${exp.project}-${exp.period}`}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.company}</h3>
                    <p className="text-sm text-gray-600 mt-1">{exp.role}</p>
                  </div>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            프로젝트 및 담당 업무
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold text-lg text-gray-900">
                    {exp.company}
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
                    {exp.responsibilities.map((res, idx) => (
                      <li key={`${exp.project}-responsibility-${idx}`}>
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold">결과</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                    {exp.achievements.map((ach, idx) => (
                      <li key={`${exp.project}-achievement-${idx}`}>{ach}</li>
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
