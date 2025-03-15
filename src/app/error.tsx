"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro capturado:", error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-96px)] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-600">An error occurred!</h1>
      <p className="mt-2 text-gray-500">{error.message || "Unknown error."}</p>
      <button
        onClick={() => reset()}
        className="mt-4 h-10 cursor-pointer rounded-lg bg-blue-500 bg-red-200 px-6 text-white transition-colors duration-300 hover:bg-blue-600 hover:bg-red-500 md:h-12"
      >
        Try again
      </button>
    </div>
  );
}
