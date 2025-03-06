"use client";

import { Volume2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface PokemonCryButtonProps {
  cryUrl: string;
}

export function PokemonCryButton({ cryUrl }: PokemonCryButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(cryUrl);
  }, [cryUrl]);

  const playCry = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <button
      title="Play cry"
      onClick={playCry}
      className="cursor-pointer size-10 flex items-center justify-center rounded-full border border-white text-white transition-opacity hover:opacity-70"
    >
      <Volume2 />
    </button>
  );
}
