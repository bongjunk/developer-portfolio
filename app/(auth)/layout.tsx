import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white shadow rounded-xl">
          {children}
        </div>
      </div>
    </>
  );
}
