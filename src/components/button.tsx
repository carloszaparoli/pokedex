import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button">;

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "group flex items-center justify-center h-12 px-8 bg-red-200 text-white rounded-md cursor-pointer transition-colors duration-300 not-disabled:hover:bg-red-500 disabled:opacity-50 disabled:cursor-default",
        className
      )}
      {...props}
    />
  );
}
