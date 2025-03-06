import Image from "next/image";

export function NoPokemonFound() {
  return (
    <div className="flex gap-8 max-w-[600px] p-4 mx-auto rounded-lg border dark:bg-bluewood-900 dark:border-bluewood-800">
      <Image src="/psyduck.svg" width={132} height={132} alt="" />
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-red-200">
          No Pokemon matches your search!
        </h4>
        <div className="space-y-2">
          <p className="dark:text-bluewood-500">
            Try these tips to refine your search:
          </p>
          <ul className="list-disc pl-4 dark:text-bluewood-500 space-y-1">
            <li>Enter at least 3 characters for better results.</li>
            <li>Use the Pokémon type filter first, then search by name.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
