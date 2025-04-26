import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";

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
      <body className="max-w-4xl mx-auto">
        <Header />
        {children}
      </body>
    </html>
  );
}
