'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import GridPattern from "../components/ui/grid-pattern";
import EnterName from '@/components/EnterName';

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const startGame = () => {
    if (playerName.trim()) {
      router.push(`/game?name=${playerName}`);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn( 
          "[mask-image:radial-gradient(500px_circle_at_center,transparent,white)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 bg-white",
        )}
      />
      <EnterName />
    </div>
  );
}
