"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/common/input/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "@/components/icons";

// zod 유효성 스키마
const registerSchema = z
  .object({
    uid: z
      .string()
      .min(1, "아이디는 필수입니다.")
      .regex(
        /^[a-zA-Z0-9_-]{3,16}$/,
        "아이디는 3~16자의 영문, 숫자, 특수문자(_-)만 가능합니다."
      ),
    password: z
      .string()
      .min(6, "비밀번호는 6자 이상이어야 합니다.")
      .regex(/[A-Za-z]/, "비밀번호에 영문이 포함되어야 합니다.")
      .regex(/[0-9]/, "비밀번호에 숫자가 포함되어야 합니다."),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    name: z.string().optional(),
    email: z
      .email({ message: "올바른 이메일 형식이 아닙니다." })
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type RegisterFormTypes = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<RegisterFormTypes>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      uid: "",
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const onSubmit = async (data: RegisterFormTypes) => {
    console.log("data", data);
    try {
      setLoading(true);
      const { confirmPassword: _, ...rest } = data;
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });

      if (!res.ok) throw new Error("회원가입 실패");

      toast.success("회원가입 성공! 로그인 해주세요.");
      router.push("/login");
    } catch (err) {
      console.log("회원가입 에러 : ", err);
      toast.error("회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <FormProvider {...methods}>
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl bg-white p-8 shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 타이틀 */}
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-gray-800">회원가입</h1>
              <p className="mt-1 text-xs text-gray-500">정보를 입력해주세요</p>
            </div>

            {/* 아이디 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                아이디
              </label>
              <Input
                format="text"
                placeholder="아이디를 입력해주세요"
                name="uid"
                control={control}
                error={errors.uid}
              />
            </div>
            {/* 비밀번호 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <Input
                format="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                name="password"
                control={control}
                error={errors.password}
                adornments={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? (
                      <EyeOff width={16} height={16} color="#6B7280" />
                    ) : (
                      <Eye width={16} height={16} color="#6B7280" />
                    )}
                  </button>
                }
              />
            </div>
            {/* 비밀번호 확인 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                비밀번호 확인
              </label>
              <Input
                format="password"
                type={showConfirm ? "text" : "password"}
                placeholder="비밀번호를 확인을 입력해주세요"
                name="confirmPassword"
                control={control}
                error={errors.confirmPassword}
                adornments={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showConfirm ? (
                      <EyeOff width={16} height={16} color="#6B7280" />
                    ) : (
                      <Eye width={16} height={16} color="#6B7280" />
                    )}
                  </button>
                }
              />
            </div>
            {/* 이름 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                이름
              </label>
              <Input
                format="text"
                placeholder="이름을 입력해주세요"
                name="name"
                control={control}
                error={errors.name}
              />
            </div>

            {/* 이메일 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                이메일
              </label>
              <Input
                format="email"
                placeholder="이메일을 입력해주세요"
                name="email"
                control={control}
                error={errors.email}
              />
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "가입 중 ..." : "회원가입"}
            </button>

            {/* 로그인 페이지 이동 */}
            <p className="mt-4 text-center text-sm text-gray-600">
              이미 계정이 있으신가요?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-medium text-blue-600 hover:underline"
              >
                로그인
              </button>
            </p>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
