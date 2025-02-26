import { ComponentProps } from "react";

type PokebalIconProps = Pick<ComponentProps<"svg">, "className">;

export function PokeballIcon(props: PokebalIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M50 0C75.7307 0 96.9556 19.148 100 43.871H75.5966C72.818 32.3973 62.4122 23.871 50 23.871C37.5878 23.871 27.182 32.3973 24.4034 43.871H0C3.04444 19.148 24.2693 0 50 0Z"></path>
      <path d="M75.5966 56.129H100C96.9556 80.852 75.7307 100 50 100C24.2693 100 3.04444 80.852 0 56.129H24.4034C27.182 67.6027 37.5878 76.129 50 76.129C62.4122 76.129 72.818 67.6027 75.5966 56.129Z"></path>
      <path d="M50 66.4516C59.1541 66.4516 66.5749 59.086 66.5749 50C66.5749 40.914 59.1541 33.5484 50 33.5484C40.8459 33.5484 33.4251 40.914 33.4251 50C33.4251 59.086 40.8459 66.4516 50 66.4516Z"></path>
    </svg>
  );
}
