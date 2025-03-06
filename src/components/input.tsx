import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputRootProps = ComponentProps<"div">;

export function InputRoot({ className, ...props }: InputRootProps) {
  return (
    <div
      className={twMerge(
        "group bg-white border-gray-200 dark:bg-bluewood-900 h-12 border dark:border-bluewood-800 rounded-lg px-4 flex items-center gap-2 focus-within:border-gray-300 dark:focus-within:border-bluewood-700 transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
}

type InputFieldProps = ComponentProps<"input">;

export function InputField(props: InputFieldProps) {
  return (
    <input
      className="flex-1 outline-0 placeholder:text-gray-400 dark:placeholder:text-bluewood-400 transition-colors duration-300"
      {...props}
    />
  );
}
