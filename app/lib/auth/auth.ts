import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../db/prisma";
import type { Session, User, Account } from "next-auth";
import type { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";

// type Credentials = {
//   uid?: string;
//   password?: string;
// };

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        uid: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"uid" | "password", unknown>>,
      ): Promise<User | null> {
        if (!credentials?.uid || !credentials?.password) {
          throw new Error("아이디와 비밀번호를 입력해주세요.");
        }

        // 기존 유저 조회
        const user = await prisma.user.findUnique({
          where: { uid: credentials.uid as string },
        });

        if (!user) {
          throw new Error("존재하지 않는 아이디입니다.");
        }

        // 비밀번호 검증
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password!,
        );

        if (!isValid) {
          throw new Error("비밀번호가 올바르지 않습니다.");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.uid = token.uid as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.uid = user.uid ?? null;
      }
      return token;
    },
  },
  // 모든 상황에서 uid 업데이트 로직 실행
  events: {
    async createUser(event) {
      await handleUserUpdate("createUser", event);
    },
    async linkAccount(event) {
      await handleUserUpdate("linkAccount", event);
    },
    async signIn(event) {
      await handleUserUpdate("signIn", event);
    },
  },
};

// uid 자동 동기화
async function handleUserUpdate(
  eventName: string,
  { user, account }: { user: User; account?: Account | null },
) {
  try {
    if (!user?.id) return;
    console.log(
      `[NextAuth event] ${eventName}:`,
      account?.provider ?? "credentials",
    );

    // uid 생성 규칙 통일
    const uid =
      account?.provider && account?.providerAccountId
        ? `${account.provider}_${account.providerAccountId}`
        : (user.uid ?? `user_${user.id}`);

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { uid },
    });

    console.log(`[NextAuth] uid synced -> ${updated.uid}`);
  } catch (error) {
    console.error(`[NextAuth] ${eventName} uid sync failed:`, error);
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
