import Image from "next/image";

import logoForDark from "../assets/logo-dark.svg";
import logoForLight from "../assets/logo-light.svg";
import { ThemeToggle } from "./theme-toggle-button";
import { GithubIcon } from "./icons/github-icon";

export function Header() {
  return (
    <div className="dark:bg-bluewood-900 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md shadow-gray-200 transition-colors duration-300 md:rounded-lg dark:shadow-none">
      <a
        href="https://github.com/carloszaparoli/pokedex"
        title="GitHub repository"
        target="_blank"
        className="dark:text-bluewood-100 text-gray-900 transition-opacity duration-300 hover:opacity-50"
      >
        <GithubIcon />
      </a>
      <Image
        src={logoForDark}
        alt=""
        width={160}
        className="hidden dark:block"
      />
      <Image
        src={logoForLight}
        alt=""
        width={160}
        className="block dark:hidden"
      />
      <ThemeToggle />
    </div>
  );
}
