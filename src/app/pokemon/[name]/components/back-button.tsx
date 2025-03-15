"use client";

import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      className="cursor-pointer transition-opacity hover:opacity-50"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="size-6 text-white md:size-7" />
    </button>
  );
}
