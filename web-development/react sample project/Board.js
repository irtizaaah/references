import React from "react";
import Square from "./Square";
import "./styles.css";

const Board = (props) => {
  let grid = [];

  for (let i = 0; i < props.gameState.length; i++) {
    grid.push(
      <Square value={props.gameState[i]} onClick={() => props.handleClick(i)} />
    );
  }
  return <div className="Board">{grid}</div>;
};

export default Board;
