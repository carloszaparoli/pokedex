import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = searchParams.get("offset") || 0;
  const limit = searchParams.get("limit") || 15;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await res.json();

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const detailRes = await fetch(pokemon.url);
      const details = await detailRes.json();

      return {
        id: details.id,
        name: details.name,
        image: details.sprites.front_default,
        types: details.types.map((t: any) => t.type.name),
      };
    })
  );

  return NextResponse.json(pokemonDetails);
}
