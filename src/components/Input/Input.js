import React, { useState } from "react";

function Input({ onSubmit,isCorrect, gameOver }) {
  const [value, setValue] = useState("");
  return (
    <form
      className='guess-input-wrapper'
      onSubmit={(event) => {
        event.preventDefault();
        if (value.length === 5) {
          onSubmit(value);
          setValue('')
        }
      }}
    >
      <label htmlFor='guess-input'>Enter guess:</label>
      <input
        id='guess-input'
        type='text'
        value={value}
        onChange={(event) => event.target.value.length <= 5 && setValue(event.target.value.toUpperCase())}
        disabled={gameOver || isCorrect}
      />
    </form>
  );
}

export default Input;
