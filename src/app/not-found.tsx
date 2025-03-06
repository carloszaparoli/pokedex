import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="500"
        viewBox="0 0 911 360"
        fill="none"
        className="transition-colors duration-300 text-gray-200 dark:text-bluewood-800"
      >
        <path
          d="M224.609 221.084H260.742V284.561H224.609V360H142.334V284.561H4.88281L0 234.268L142.334 5.26367V4.53125H224.609V221.084ZM78.3691 221.084H142.334V111.709L137.207 120.01L78.3691 221.084Z"
          fill="currentColor"
        />
        <path
          d="M874.609 221.084H910.742V284.561H874.609V360H792.334V284.561H654.883L650 234.268L792.334 5.26367V4.53125H874.609V221.084ZM728.369 221.084H792.334V111.709L787.207 120.01L728.369 221.084Z"
          fill="currentColor"
        />
        <circle
          cx="455.596"
          cy="180"
          r="172"
          fill="white"
          stroke="#333333"
          strokeWidth="16"
        />
        <path
          d="M619.596 180H455.596H291.596C291.596 89.4253 365.021 16 455.596 16C546.17 16 619.596 89.4253 619.596 180Z"
          fill="#F04E54"
        />
        <circle
          cx="454.596"
          cy="180"
          r="62"
          fill="white"
          stroke="#333333"
          strokeWidth="16"
        />
        <circle
          cx="454.596"
          cy="180"
          r="36.5"
          fill="white"
          stroke="#808080"
          strokeWidth="5"
        />
        <path d="M288.596 172H388.596V188H288.596V172Z" fill="#333333" />
        <rect x="520.596" y="172" width="101" height="16" fill="#333333" />
        <path
          d="M543.316 56.239C533.969 49.2642 526.361 44.9049 515.384 40.1097C503.754 35.0966 499.081 34.7696 495.277 38.584C492.016 41.7444 491.69 47.6294 494.516 50.8989C495.494 52.2067 500.059 54.6042 504.624 56.4569C526.144 64.9575 545.273 80.3239 558.967 100.376C565.923 110.621 568.858 112.909 573.531 111.711C577.987 110.621 580.596 107.242 580.596 102.556C580.596 93.8376 560.815 69.2078 543.316 56.239Z"
          fill="white"
        />
      </svg>
      <h1 className="text-4xl font-bold mt-8 mb-2 transition-colors">
        Page not found
      </h1>
      <p className="transition-colors duration-300 text-gray-500 dark:text-bluewood-500 mb-12">
        You look lost on your journey!
      </p>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 h-12 px-4 bg-red-200 text-white rounded-md cursor-pointer transition-colors duration-300 not-disabled:hover:bg-red-500"
      >
        <ArrowLeftIcon className="size-5" />
        Go back home
      </Link>
    </div>
  );
}
