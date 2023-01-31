import React from "react";

function Cell({ letter, status }) {
  return <span className={`cell ${status ? status : ""}`}>{letter}</span>;
}

export default Cell;
