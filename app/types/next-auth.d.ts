import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    uid: string | null;
    role?: "user" | "admin";
    password?: string | null;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      uid: string | null;
      role?: "user" | "admin";
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    uid: string | null;
    role?: "user" | "admin";
    email?: string | null;
    name?: string | null;
    picture?: string | null;
  }
}
