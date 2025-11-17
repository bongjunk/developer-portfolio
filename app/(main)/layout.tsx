import { ReactNode } from "react";
import Header from "@/components/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-scree flex flex-col">
        <Header />
        <main className="flex-1 pt-16 px-6 bg-gray-50">{children}</main>
      </div>
    </>
  );
}
