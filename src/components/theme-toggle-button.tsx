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
        "group flex size-10 cursor-pointer items-center justify-center rounded-full",
        "dark:bg-bluewood-800 border bg-white transition-colors duration-300",
        isDark
          ? "border-bluewood-700 hover:bg-type-electric-secondary hover:border-type-electric-secondary"
          : "hover:bg-type-ghost-primary hover:border-type-ghost-primary border-gray-200",
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
