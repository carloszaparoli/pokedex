export function PokemonSkeletonCard() {
  return (
    <div className="w-full bg-white dark:bg-bluewood-900 p-5 rounded-lg flex items-center justify-between transition-colors duration-300">
      <div className="space-y-3.5">
        <div className="h-[14px] w-[40px] bg-gray-200 dark:bg-bluewood-700 rounded-sm animate-pulse transition-colors duration-300" />
        <div className="h-[20px] w-[120px] bg-gray-200 dark:bg-bluewood-700 rounded-sm animate-pulse transition-colors duration-300" />
        <div className="flex items-center gap-1">
          <div className="h-[16px] w-[70px] bg-gray-200 dark:bg-bluewood-700 rounded-sm animate-pulse transition-colors duration-300" />
          <div className="h-[16px] w-[70px] bg-gray-200 dark:bg-bluewood-700 rounded-sm animate-pulse transition-colors duration-300" />
        </div>
      </div>
      <div className="h-14 w-14 bg-gray-200 dark:bg-bluewood-700 rounded-full animate-pulse transition-colors duration-300" />
    </div>
  );
}
