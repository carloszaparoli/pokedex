import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputRootProps = ComponentProps<"div">;

export function InputRoot({ className, ...props }: InputRootProps) {
  return (
    <div
      className={twMerge(
        "group bg-gray-900 h-12 border border-gray-800 rounded-lg px-4 flex items-center gap-2 focus-within:border-gray-700",
        className
      )}
      {...props}
    />
  );
}

type InputFieldProps = ComponentProps<"input">;

export function InputField(props: InputFieldProps) {
  return (
    <input className="flex-1 outline-0 placeholder:text-gray-400" {...props} />
  );
}
