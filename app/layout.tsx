import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "./components/provider";
import { auth } from "./lib/auth/auth";

export const metadata: Metadata = {
  title: "Bong Portfolio",
  description: "개발자 포트폴리오",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ko">
      <body>
        <SessionProvider session={session}>
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
