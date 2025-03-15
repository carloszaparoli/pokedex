import Image from "next/image";

export function NoPokemonFound() {
  return (
    <div className="dark:bg-bluewood-900 dark:border-bluewood-800 mx-auto flex max-w-[600px] gap-8 rounded-lg border border-gray-200 bg-white p-4 transition-colors duration-300">
      <Image
        src="/psyduck.svg"
        width={132}
        height={132}
        alt="Psyduck"
        className="hidden md:block"
      />
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-red-200 md:text-xl">
          No Pokemon matches your search!
        </h4>
        <div className="dark:text-bluewood-500 space-y-2 text-gray-600">
          <p>Try these tips to refine your search:</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>Enter at least 3 characters for better results.</li>
            <li>Use the Pokémon type filter first, then search by name.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
