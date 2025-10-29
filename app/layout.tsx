import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Bong Portfolio",
  description: "개발자 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SessionProvider>
          <Toaster
            position="top-center"
            toastOptions={{ style: { fontSize: 12, fontWeight: 600 } }}
          />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
