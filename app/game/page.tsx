"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Simulated image data (replace with actual Kaggle dataset integration)
const sampleImages = [
  { url: "/placeholder.svg?height=300&width=400", isAI: false },
  { url: "/placeholder.svg?height=300&width=400", isAI: true },
  { url: "/placeholder.svg?height=300&width=400", isAI: false },
  { url: "/placeholder.svg?height=300&width=400", isAI: true },
]

export default function Game() {
  const [currentImage, setCurrentImage] = useState(sampleImages[0])
  const [score, setScore] = useState(0)
  const [totalGuesses, setTotalGuesses] = useState(0)
  const [guessResult, setGuessResult] = useState<string | null>(null)

  const getNextImage = () => {
    const nextIndex = Math.floor(Math.random() * sampleImages.length)
    setCurrentImage(sampleImages[nextIndex])
    setGuessResult(null)
  }

  useEffect(() => {
    getNextImage()
  }, [])

  const handleGuess = (guessIsAI: boolean) => {
    setTotalGuesses(totalGuesses + 1)
    if (guessIsAI === currentImage.isAI) {
      setScore(score + 1)
      setGuessResult("Correct!")
    } else {
      setGuessResult("Wrong!")
    }
    setTimeout(getNextImage, 1500)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Real or AI?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative w-full aspect-video">
            <img
              src={currentImage.url}
              alt="Guess if this is real or AI-generated"
              className="object-cover w-full h-full rounded-md"
            />
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
          <Button onClick={() => handleGuess(false)} disabled={guessResult !== null}>
            Real
          </Button>
          <Button onClick={() => handleGuess(true)} disabled={guessResult !== null}>
            AI
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}