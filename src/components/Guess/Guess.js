import React from "react";
import { range } from "../../utils";
import Cell from "../Cell";

function checkGameGuess(currentGuess, solution) {
  //   console.log("guess", guess);
  if (!currentGuess) return "";

  let solutionArray = [...solution];
  let formattedGuess = [...currentGuess].map((l) => {
    return { letter: l, status: "incorrect" };
  });

  // find any green letters
  formattedGuess.forEach((l, i) => {
    if (solution[i] === l.letter) {
      formattedGuess[i].status = "correct";
      solutionArray[i] = null;
    }
  });

  // find any yellow letters
  formattedGuess.forEach((l, i) => {
    if (solutionArray.includes(l.letter) && l.status !== "correct") {
      formattedGuess[i].status = "misplaced";
      solutionArray[solutionArray.indexOf(l.letter)] = null;
    }
  });

  return formattedGuess;
}

function Guess({ guesses, answer }) {
  const result = checkGameGuess(guesses, answer);
//   console.log("result", result);
  return (
    <p className='guess'>
      {range(5).map((num) => {
        return (
          <Cell
            key={num}
            letter={result && result[num].letter}
            status={result && result[num].status}
          />
        );
      })}
    </p>
  );
}

export default Guess;
