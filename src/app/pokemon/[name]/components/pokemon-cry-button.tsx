"use client";

import { Volume2 } from "lucide-react";
import { useRef } from "react";

interface PokemonCryButtonProps {
  cryUrl: string;
}

export function PokemonCryButton({ cryUrl }: PokemonCryButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playCry = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio: ", error);
          alert(`Error playing audio: ${error}`);
        });
      }
    } catch (error) {
      console.error("Error playing audio: ", error);
      alert(`Error playing audio: ${error}`);
    }
  };

  return (
    <div className="flex gap-2">
      <audio ref={audioRef} src={cryUrl}></audio>
      <button
        onClick={playCry}
        className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-200 px-4 text-white transition-colors duration-300 hover:bg-red-500"
      >
        <Volume2 className="size-5" />
        Play
      </button>
    </div>
  );
}
