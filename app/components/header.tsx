"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, MouseEvent } from "react";
import toast from "react-hot-toast";
import HamburgerIcon from "./icons/HambergerIcon";
import CloseIcon from "./icons/CloseIcon";
import Image from "next/image";

type NavLinkTypes = {
  href: string;
  label: string;
};

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // const isActive = (href: string) => pathname.startsWith(href);
  const isActive = (href: string) => {
    if ((href = "/")) return pathname === "/";
    return pathname.startsWith(href);
  };

  const links: NavLinkTypes[] = [
    { href: "/", label: "홈" },
    ...(session
      ? [{ href: "/portfolio", label: "포트폴리오" }]
      : [{ href: "/login", label: "로그인" }]),
  ];

  // 로그아웃 핸들러
  const handleSignOutClick = (): void => {
    toast.success("로그아웃 되었습니다.");
    signOut({ callbackUrl: "/login" });
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 모바일 메뉴 닫기 핸들러
  const handleCloseClick = (): void => {
    setIsOpen(false);
  };

  // 모바일 메뉴 내 이벤트 버블링 방지
  const handleStopPropagation = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const userName = session?.user?.name ?? session?.user?.email ?? "User";
  const userImage = session?.user?.image;

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* 로고 */}
        <h1 className="text-base font-bold">
          <Link href="/">Bong’s Portfolio</Link>
        </h1>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex space-x-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors ${
                isActive(href)
                  ? "font-bold text-blue-600"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}
          {/* 로그아웃 버튼 */}
          {session && (
            <div className="flex items-center space-x-3">
              {userImage ? (
                <Image
                  src={userImage}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border"
                />
              ) : (
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-white">
                  {userName[0]}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700">
                {userName}
              </span>
              <button
                onClick={handleSignOutClick}
                className="text-gray-700 hover:text-red-500 transition-colors"
              >
                로그아웃
              </button>
            </div>
          )}
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* 모바일 메뉴 (오버레이) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40"
          onClick={handleCloseClick}
        >
          <nav
            role="dialog"
            aria-modal="true"
            className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col"
            onClick={handleStopPropagation}
          >
            {/* 닫기 버튼 (햄버거 위치 동일) */}
            <button
              onClick={handleCloseClick}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>

            {/* 모바일 사용자 정보 */}
            {session && (
              <div className="flex items-center space-x-3 mb-6 mt-8">
                {userImage ? (
                  <Image
                    src={userImage}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full border"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-white">
                    {userName[0]}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {userName}
                </span>
              </div>
            )}

            {/* 네비게이션 링크 */}
            <ul className="mt-12 flex flex-col space-y-3">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={handleCloseClick}
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                      isActive(href)
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {/* 로그아웃 버튼 */}
              {session && (
                <li>
                  <button
                    onClick={() => {
                      handleCloseClick();
                      handleSignOutClick();
                    }}
                    className="w-full text-left block rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
