import Image from "next/image";

import logoDark from "../assets/logo-dark.svg";
import { ThemeToggle } from "./theme-toggle-button";
import { GithubIcon } from "./icons/github-icon";

export function Header() {
  return (
    <div className="bg-white shadow-md shadow-gray-200 dark:shadow-none dark:bg-bluewood-900 w-full h-16 px-4 flex items-center justify-between md:rounded-lg transition-colors duration-300">
      <a
        href="https://github.com/carloszaparoli/pokedex"
        title="GitHub repository"
        target="_blank"
        className="hover:opacity-50 transition-opacity"
      >
        <GithubIcon className="text-gray-900 dark:text-bluewood-100 transition-colors duration-300" />
      </a>
      <Image src={logoDark} alt="" width={160} />
      <ThemeToggle />
    </div>
  );
}
