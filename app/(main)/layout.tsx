import { ReactNode } from "react";
import Header from "@/components/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 pt-20 px-6">{children}</main>
      </div>
    </>
  );
}
