"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = useMemo(() => theme === "dark", [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) return <div className="size-10" />;

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Light mode" : "Dark mode"}
      className={twMerge(
        "group cursor-pointer size-10 flex items-center justify-center rounded-full",
        "transition-colors duration-300 border bg-white dark:bg-bluewood-800",
        isDark
          ? "border-bluewood-700 hover:bg-type-electric-secondary hover:border-type-electric-secondary"
          : "border-gray-200 hover:bg-type-ghost-primary hover:border-type-ghost-primary"
      )}
    >
      {isDark ? (
        <Sun className="text-type-electric-primary group-hover:text-white" />
      ) : (
        <MoonStar className="text-type-ghost-primary group-hover:text-white" />
      )}
    </button>
  );
}
