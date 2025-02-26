export async function generateStaticParams() {
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000"
  ).then((res) => res.json());

  return data.results.map((pokemon: { name: string }) => {
    return {
      slug: pokemon.name,
    };
  });
}

interface PokemonPageProps {
  params: Promise<{ slug: string }>;
}
export default async function PokemonPage({ params }: PokemonPageProps) {
  const slug = (await params).slug;
  return <h1>Pokemon {slug}</h1>;
}
