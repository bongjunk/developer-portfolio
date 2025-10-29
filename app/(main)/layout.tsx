import { ReactNode } from "react";
import Header from "@/components/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-scree flex flex-col">
        {/* 고정 헤더 */}
        <Header />

        {/* 헤더 높이만큼 padding-top 추가해서 컨텐츠 안 가려지게 */}
        <main className="flex-1 pt-16 px-6 bg-gray-50">{children}</main>
      </div>
    </>
  );
}
