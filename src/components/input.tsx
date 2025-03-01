import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputRootProps = ComponentProps<"div">;

export function InputRoot({ className, ...props }: InputRootProps) {
  return (
    <div
      className={twMerge(
        "group dark:bg-bluewood-900 h-12 border dark:border-bluewood-800 rounded-lg px-4 flex items-center gap-2 dark:focus-within:border-bluewood-700",
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
      className="flex-1 outline-0 dark:placeholder:text-bluewood-400"
      {...props}
    />
  );
}
