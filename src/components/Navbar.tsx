"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/essays", label: "随笔" },
  { href: "/photos", label: "照片" },
  { href: "/fund", label: "基金" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur dark:border-stone-700 dark:bg-stone-900/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-lg font-semibold text-stone-900 transition-colors hover:text-indigo-500 dark:text-stone-50 dark:hover:text-indigo-400"
        >
          个人网站
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-stone-600 transition-colors hover:text-indigo-500 dark:text-stone-400 dark:hover:text-indigo-400"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggleDark}
            className="rounded-full p-2 text-stone-600 transition-colors hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
            aria-label="切换深色模式"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDark}
            className="rounded-full p-2 text-stone-600 dark:text-stone-400"
            aria-label="切换深色模式"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-2 text-stone-600 dark:text-stone-400"
            aria-label="菜单"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white px-4 py-3 dark:border-stone-700 dark:bg-stone-900 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-stone-600 transition-colors hover:text-indigo-500 dark:text-stone-400 dark:hover:text-indigo-400"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
