export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, "0")}`;
};

export const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
