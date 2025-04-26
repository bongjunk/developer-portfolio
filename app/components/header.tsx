"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "홈" },
    { href: "/login", label: "로그인" },
    { href: "/dashboard", label: "대시보드" },
  ];

  return (
    <>
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">My Portfolio</h1>
        <nav className="flex space-x-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline ${
                pathname === href ? "font-bold text-blue-500" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
};

export default Header;
