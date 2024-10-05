'use client';

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

// Simulated image data (replace with actual Kaggle dataset integration)
const sampleImages = [
    { url: "/placeholder.svg?height=300&width=400", isAI: false },
    { url: "/placeholder.svg?height=300&width=400", isAI: true },
    { url: "/placeholder.svg?height=300&width=400", isAI: false },
    { url: "/placeholder.svg?height=300&width=400", isAI: true },
  ]

interface ImageData {
    url: string;
    type: 'ai' | 'real';
}

export default function GuessGame() {
    const [currentImage, setCurrentImage] = useState(sampleImages[0])
    const [score, setScore] = useState(0)
    const [totalGuesses, setTotalGuesses] = useState(0)
    const [guessResult, setGuessResult] = useState<string | null>(null)

    const [imageData, setImageData] = useState<ImageData | null>(null);
    const [userGuess, setUserGuess] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
  
    // Fetch a new image from the API
    const getNextImage = async () => {
      const res = await fetch('/api/images'); 
      const data: ImageData = await res.json();
      setImageData(data);
      console.log(data);
      // Reset game state
      setUserGuess(null);
      setIsCorrect(null);
      setFeedback(null);
      //const nextIndex = Math.floor(Math.random() * sampleImages.length)
      //setCurrentImage(sampleImages[nextIndex])
      //setGuessResult(null)
    }
  
    useEffect(() => {
      getNextImage()
    }, [])
  
    const handleGuess = (guess: 'ai' | 'real') => {
      if (!imageData) return;
      setUserGuess(guess);
      const correct = guess === imageData.type;
      setIsCorrect(correct);
      setFeedback(correct ? "Correct!" : "Wrong!");    
      //setTotalGuesses(totalGuesses + 1)
      //if (guessIsAI === currentImage.isAI) {
       // setScore(score + 1)
       // setGuessResult("Correct!")
      //} else {
       // setGuessResult("Wrong!")
      //}
      //setTimeout(getNextImage, 1500)
    }

  return (
    <div className="flex items-center bg-white justify-center min-h-screen p-4">
      <NeonGradientCard borderSize={1} borderRadius={20} neonColors={{firstColor:"#0B486B", secondColor:"#F56217"}} className="w-full bg-white max-w-md relative shadow-lg h-fit max-w-sm items-center justify-center text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Real or AI?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative w-full aspect-video">
            {imageData ? (
                <img
                src={imageData.url}
                alt="Guess if this is real or AI-generated"
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
                <p>Loading image...</p>
            )}
          </div>
          <div className="text-lg font-semibold">
            Score: {score} / {totalGuesses}
          </div>
          {guessResult && (
            <div
              className={`text-lg font-bold ${
                guessResult === "Correct!" ? "text-green-500" : "text-red-500"
              }`}
            >
              {guessResult}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button onClick={() => handleGuess('real')} disabled={guessResult !== null}>
            Real
          </Button>
          <Button onClick={() => handleGuess('ai')} disabled={guessResult !== null}>
            AI
          </Button>
        </CardFooter>
      </NeonGradientCard>
    </div>
  );
}