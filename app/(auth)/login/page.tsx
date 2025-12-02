"use client";

import { FormProvider, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Input from "@/components/common/input/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { GithubIcon } from "@/components/icons";

const loginSchema = z.object({
  uid: z.string().min(1, "아이디를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
  rememberId: z.boolean(),
});

type LoginTypes = z.infer<typeof loginSchema>;

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const moveRef = useRef<boolean>(false);

  console.log(session, status);

  const methods = useForm<LoginTypes>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      uid: "",
      password: "",
      rememberId: false,
    },
  });

  const { setValue, watch } = methods;
  const rememberId = watch("rememberId");

  // localStorage에서 아이디 불러오기
  useEffect(() => {
    const saveUid = localStorage.getItem("saveUid");
    if (saveUid) {
      setValue("uid", saveUid);
      setValue("rememberId", true);
      // 아이디 자동 세팅 후 비밀번호 자동 포커스
      setTimeout(() => {
        passwordRef.current?.focus();
      }, 100);
    }
  }, [setValue]);

  // 로그인 성공 시 페이지 이동 (중복 이동 방지)
  useEffect(() => {
    if (status === "authenticated" && !moveRef.current) {
      moveRef.current = true;
      toast.success("로그인 성공!");
      router.push("/portfolio");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>로딩중...</p>;
  }

  const onSubmit = async ({ uid, password }: LoginTypes) => {
    console.log("data : ", uid, password);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        uid,
        password,
      });

      if (res?.error) {
        methods.setError("uid", {
          type: "manual",
          message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        });
        methods.setError("password", {
          type: "manual",
          message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        });
        toast.error("아이디나 비밀번호가 일치하지 않습니다.");
        return;
      }

      if (rememberId) {
        localStorage.setItem("saveUid", uid);
      } else {
        localStorage.removeItem("saveUid");
      }
    } catch (error) {
      console.log("로그인 에러 : ", error);
      toast.error("로그인 중 문제가 발생했습니다.");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <FormProvider {...methods}>
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl bg-white p-8 shadow-md">
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* 타이틀 */}
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800">LOGIN</h1>
                <p className="mt-1 text-xs text-gray-500">로그인 해주세요</p>
              </div>
              {/* 아이디 */}
              <div>
                <label
                  htmlFor="uid"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  아이디
                </label>
                <Input
                  format="text"
                  placeholder="아이디를 입력해주세요"
                  name="uid"
                  control={methods.control}
                  error={methods.formState.errors.uid}
                />
              </div>
              {/* 비밀번호 */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  비밀번호
                </label>
                <Input
                  format="text"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  name="password"
                  control={methods.control}
                  error={methods.formState.errors.password}
                />
              </div>
              {/* 아이디 저장 */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberId"
                  {...methods.register("rememberId")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="rememberId"
                  className="text-xs text-gray-600 cursor-pointer"
                >
                  아이디 저장
                </label>
              </div>
              {/* 로그인 버튼 */}
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                로그인
              </button>
              {/* 구분선 */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="px-2 text-sm text-gray-400">또는</span>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              {/* GitHub 로그인 */}
              <button
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/portfolio" })}
                className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <GithubIcon width={20} height={20} />
                GitHub 계정으로 로그인
              </button>
              {/* 회원가입 링크 */}
              <div className="mt-4 text-center text-sm text-gray-600">
                계정이 없으신가요?{" "}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:underline"
                >
                  회원가입
                </Link>
              </div>
            </form>
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default Page;
