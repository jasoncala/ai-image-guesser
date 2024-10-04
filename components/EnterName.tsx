'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function EnterName() {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const startGame = () => {
    if (playerName.trim()) {
      router.push(`/game?name=${playerName}`);
    }
  }; 

  return (
    <div className="flex items-center bg-white justify-center min-h-screen p-4">
      <NeonGradientCard borderSize={1} borderRadius={20} neonColors={{firstColor:"#0B486B", secondColor:"#F56217"}} className="w-full bg-white max-w-md relative shadow-lg h-fit max-w-sm items-center justify-center text-center" >
        <CardHeader className="">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-primary">AI Image Guessing Game</CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">Enter your name to start playing</CardDescription>
        </CardHeader>
        <CardContent className="">
          <Input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="mb-4"
          />
        </CardContent>
        <CardFooter className="flex justify-center rounded-lg">
          <Button onClick={startGame} disabled={!playerName.trim()} className="w-full sm:w-auto">
            Start Game
          </Button>
        </CardFooter>
      </NeonGradientCard>
    </div>
  );
}