import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputRootProps = ComponentProps<"div">;

export function InputRoot({ className, ...props }: InputRootProps) {
  return (
    <div
      className={twMerge(
        "group dark:bg-bluewood-900 dark:border-bluewood-800 dark:focus-within:border-bluewood-600 flex h-12 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 transition-colors duration-300 focus-within:border-gray-300",
        className,
      )}
      {...props}
    />
  );
}

type InputFieldProps = ComponentProps<"input">;

export function InputField(props: InputFieldProps) {
  return (
    <input
      className="dark:placeholder:text-bluewood-400 flex-1 outline-0 placeholder:text-gray-400"
      {...props}
    />
  );
}
