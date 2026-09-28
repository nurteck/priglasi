"use client";

import { Music, VolumeX } from "lucide-react";

export function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Выключить музыку" : "Включить музыку"}
      aria-pressed={playing}
      className="fixed top-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur"
    >
      {playing ? (
        <Music size={18} className="animate-pulse" aria-hidden="true" />
      ) : (
        <VolumeX size={18} aria-hidden="true" />
      )}
    </button>
  );
}
