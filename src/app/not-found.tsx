import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon";
import { NotFoundIcon } from "@/components/icons/not-found-icon";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex h-[calc(100dvh-64px)] flex-col items-center justify-center px-4">
      <NotFoundIcon className="dark:text-bluewood-800 w-full max-w-[500px] text-gray-200 md:w-full" />
      <h1 className="mt-8 mb-2 text-4xl font-bold">Page not found</h1>
      <p className="dark:text-bluewood-500 mb-12 text-gray-500">
        You look lost on your journey!
      </p>
      <Link
        href="/"
        className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-red-200 px-4 text-white transition-colors duration-300 not-disabled:hover:bg-red-500"
      >
        <ArrowLeftIcon className="size-5" />
        Go back home
      </Link>
    </div>
  );
}
