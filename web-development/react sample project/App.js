import "./styles.css";
import Board from "./Board";
import { useEffect, useState } from "react";

export default function App() {
  const [player, setPlayer] = useState(true);
  const [gameState, setGameState] = useState(new Array(9).fill(null));
  const [won, setWon] = useState(null);

  const makeMove = (index) => {
    let newState = gameState.slice();
    if (!won && gameState[index] == null) {
      newState[index] = player ? "X" : "O";
      setPlayer(!player);
      setGameState(newState);
      checkWinner();
    }
  };

  const reset = () => {
    setGameState(new Array(9).fill(null));
  };

  const checkWinner = () => {
    const streaks = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 6, 4]
    ];

    for (let i = 0; i < streaks.length; i++) {
      const [a, b, c] = streaks[i];

      if (
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c] &&
        gameState[a] != null
      ) {
        setWon(true);

        return gameState[a];
      }
    }
    return null;
  };

  return (
    <div className="App">
      <p>Tic Tac Toe</p>
      <Board gameState={gameState} handleClick={makeMove} />
      <p>Player {player ? "X" : "O"} {won ? "Wins" : ""}</p>
      <button
        onClick={() => {
          reset();
        }}
      >
        reset
      </button>
    </div>
  );
}
