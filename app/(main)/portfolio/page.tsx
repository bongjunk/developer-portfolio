"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import AuthDemoBanner from "./AuthDemoBanner";
import AuthStatusCard from "./AuthStatusCard";

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
  const { status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-20 text-gray-500">로딩 중...</p>;
  }

  const isAuthenticated = status === "authenticated";

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
    "Recoil",
    "Zod",
  ];

  // 경력사항
  const experiences: ExperiencesTypes[] = [
    {
      company: "애니드림오토서비스 / 모빌리버스",
      role: "프론트엔드 개발자",
      period: "2022.01 ~ 2024.11",
      project: "차량관리 ERP 가마(GAMA), 연동 어드민 페이지 개발",
      stack: [
        "Next.js",
        "NextAuth",
        "Typescript",
        "GraphQL",
        "Recoil",
        "Tailwind CSS",
        "ZOD",
      ],
      responsibilities: [
        "차량관리 ERP 가마(GAMA) 서비스 기능/화면 개발 참여",
        "메뉴 단위 기능 개발 및 유지보수 (고객센터 등 운영 메뉴)",
        "GAMA ERP와 연동되는 어드민 시스템 UI 개발",
        "어드민 페이지 NextAuth 기반 인증 흐름 구현 (로그인/세션 처리, 보호 페이지 접근 제어)",
        "추심관리(채권/상환 관련) 메뉴 UI 및 데이터 등록, 조회/처리 화면 구현",
        "폼 입력/검증 및 공통 UI 컴포넌트 기반으로 화면 구성",
      ],
      achievements: [
        "ERP(GAMA) 연동 환경에서 인증/세션 기반 사용자 흐름을 구현",
        "운영에 필요한 핵심 메뉴(고객센터, 추심관리 등)를 기능 단위로 적용 및 테스트",
        "데이터 관리 화면(목록/상세/검색 등) 중심의 어드민 UX를 안정적으로 제공하며 운영 요구사항 반영",
      ],
    },
    {
      company: "애니드림오토서비스",
      role: "프론트엔드 개발자",
      period: "2023.05.23 ~ 2023.06.09",
      project: "모빌리버스 홈페이지 리뉴얼",
      stack: ["Next.js", "Typescript", "Tailwind CSS"],
      responsibilities: [
        "투자정보 메뉴 리뉴얼",
        "페이지/컴포넌트 유지보수 및 배포",
      ],
      achievements: [
        "서비스 반영 및 운영 배포 경험",
        "홈페이지: mobiliverse.co.kr",
      ],
    },
  ];

  const projects: ProjectsTypes[] = [
    {
      title: "포트폴리오 웹사이트",
      description:
        "Next.js + Tailwind + NextAuth v5 기반 반응형 개인 포트폴리오",
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
            Next.js · TypeScript · UI/UX · 인증 시스템
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
            <h3 className="font-bold text-gray-900">
              애니드림오토서비스 / 모빌리버스
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              프론트엔드 개발자 (2022.01 ~ 2024.11)
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-3 space-y-1">
              <li>차량관리 ERP 가마(GAMA) 서비스 화면 및 기능 개발 참여</li>
              <li>
                GAMA ERP 연동 어드민 시스템에서 로그인/세션 기반 접근 제어 구현
              </li>
              <li>추심관리 등 운영 핵심 메뉴의 등록/조회/처리 UI 개발</li>
              <li>메뉴 단위 기능 개발 및 유지보수 (고객센터, 투자정보 등)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            프로젝트 및 담당 업무
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.company}
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
                    {exp.responsibilities.map((res) => (
                      <li key={res}>{res}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold">결과</h4>
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
