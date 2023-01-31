import React, { useState, useEffect, useCallback } from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import Guess from "../Guess";
import Input from "../Input";
import Notification from "../Notification";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [turn, setTurn] = useState(0);
  const isCorrect = guesses.includes(answer);
  const gameOver = guesses.length === NUM_OF_GUESSES_ALLOWED;

  const handleKeyup = useCallback(
    ({ key }) => {
      if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
        // setGuesses(prev => )
      }
      if (key === "Enter") {
        // console.log("currentGuess", currentGuess);
        const newGuess = [...guesses, currentGuess];
        setGuesses(newGuess);
        setTurn((prev) => prev + 1);
        setCurrentGuess("");
      }
    },
    [currentGuess, guesses]
  );

  useEffect(() => {
    if (isCorrect || gameOver) {
      window.removeEventListener("keyup", handleKeyup);
      return;
    }
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [gameOver, handleKeyup, isCorrect]);

  const handleSubmit = (value) => {
    const newGuess = [...guesses, value];
    setGuesses(newGuess);
  };
  // console.log("currentGuess", currentGuess);

  return (
    <div className='game-wrapper'>
      <div className='guess-results'>
        {range(NUM_OF_GUESSES_ALLOWED).map((num) => {
          if (turn === num) {
            let letters = currentGuess.split("");
            return (
              <p className='guess' key={num}>
                {letters.map((letter, i) => (
                  <span key={i} className='cell'>
                    {letter}
                  </span>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                  <span key={i} className='cell'></span>
                ))}
              </p>
            );
          }
          return (
            <Guess
              key={num}
              guesses={guesses[num]}
              answer={answer}
              currentGuess={currentGuess}
              turn={turn}
            />
          );
        })}
      </div>

      <Input
        onSubmit={handleSubmit}
        isCorrect={isCorrect}
        gameOver={gameOver}
      />
      <Notification
        guesses={guesses}
        answer={answer}
        isCorrect={isCorrect}
        gameOver={gameOver}
      />
    </div>
  );
}

export default Game;
