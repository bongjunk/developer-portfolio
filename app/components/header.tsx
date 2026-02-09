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
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isAuthenticated = status === "authenticated";

  const userName = session?.user?.name ?? session?.user?.email ?? "데모 유저";
  const userImage = session?.user?.image;

  const links: NavLinkTypes[] = [
    { href: "/", label: "홈" },
    { href: "/portfolio", label: "포트폴리오" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);
  // 모바일 메뉴 닫기 핸들러
  const handleCloseClick = (): void => {
    setIsOpen(false);
  };

  // 로그아웃 핸들러
  const handleSignOutClick = async () => {
    toast.success("로그아웃 되었습니다.");
    await signOut({ callbackUrl: "/" });
  };

  // 모바일 로그아웃 핸들러
  const handleMobileSignOutClick = async () => {
    handleCloseClick();
    await handleSignOutClick();
  };

  // 모바일 메뉴 내 이벤트 버블링 방지
  const handleStopPropagation = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* 로고 */}
        <Link href="/" className="text-base font-bold">
          Bong’s Portfolio
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex md:items-center space-x-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition ${
                isActive(href)
                  ? "font-bold text-blue-600"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}
          {/* 상태 영역 */}
          {/* 로그아웃 버튼 */}
          {isAuthenticated ? (
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
          ) : (
            <Link
              href="/login"
              className={`transition text-gray-700 hover:text-gray-900`}
            >
              로그인
            </Link>
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
          className="fixed md:hidden inset-0 z-40 bg-black bg-opacity-40"
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
              className="absolute top-3 right-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>

            {/* 모바일 사용자 정보 */}
            {isAuthenticated && (
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
              {isAuthenticated ? (
                <li>
                  <button
                    onClick={handleMobileSignOutClick}
                    className="w-full text-left block rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition text-gray-700 hover:bg-gray-100`}
                  >
                    로그인
                  </Link>
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
