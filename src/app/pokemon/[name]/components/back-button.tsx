"use client";

import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      className="cursor-pointer absolute left-8 top-8 transition-opacity hover:opacity-50"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="text-white size-7" />
    </button>
  );
}
