export function PokemonSkeletonCard() {
  return (
    <div className="w-full bg-gray-900 p-5 rounded-lg flex items-center justify-between">
      <div className="space-y-4">
        <div className="h-[14px] w-[40px] bg-gray-700 rounded-sm animate-pulse" />
        <div className="h-[20px] w-[120px] bg-gray-700 rounded-sm animate-pulse" />
        <div className="flex items-center gap-1">
          <div className="h-[16px] w-[70px] bg-gray-700 rounded-sm animate-pulse" />
          <div className="h-[16px] w-[70px] bg-gray-700 rounded-sm animate-pulse" />
        </div>
      </div>
      <div className="h-14 w-14 bg-gray-700 rounded-full animate-pulse" />
    </div>
  );
}
