import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { uid, password, name, email } = await req.json();

    if (!uid || !password) {
      return NextResponse.json(
        { error: "아이디와 비밀번호는 필수입니다." },
        { status: 400 },
      );
    }

    // 중복 확인
    // const existingUser = await prisma.user.findUnique({
    //   where: { uid },
    // });

    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: "이미 가입된 아이디입니다." },
    //     { status: 400 },
    //   );
    // }

    // uid, email 중복 체크 (email은 필수x)
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ uid }, ...(email ? [{ email }] : [])],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "이미 가입된 아이디 또는 이메일입니다." },
        { status: 400 },
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        uid,
        password: hashedPassword,
        name: name || null,
        email: email || null,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "이미 가입된 아이디 또는 이메일입니다." },
        { status: 400 },
      );
    }

    console.error("회원가입 오류", error);
    return NextResponse.json({ error: "회원가입 실패" }, { status: 500 });
  }
}
