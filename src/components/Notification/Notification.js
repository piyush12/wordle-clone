import React from "react";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function Notification({ isCorrect, gameOver, guesses, answer }) {
  console.log("gameOver",gameOver)
  if (isCorrect) {
    return (
      <div className='happy banner'>
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>{guesses.length} guesses</strong>.
        </p>
      </div>
    );
  }
  if (gameOver) {
    return <div className='sad banner'>Correct word is {answer}!</div>;
  }

  return null;
}

export default Notification;
