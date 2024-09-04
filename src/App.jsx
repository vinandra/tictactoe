import { useState } from "react";

function Squire({ value, onSquareClick }) {
  return (
    <button className='squire' onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nexrSquare = squares.slice();
    nexrSquare[i] = xIsNext ? "X" : "O";
    setSquares(nexrSquare);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status = winner
    ? "Nah Id Win : " + winner + "🫸🔵🔴🫷🫴🟣"
    : "Player : " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
        {Array.from({ length: 9 }).map((_, i) => {
          return (
            <Squire
              key={i}
              value={squares[i]}
              onSquareClick={() => handleClick(i)}
            />
          );
        })}
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[c]) {
      return squares[a];
    }
  }
  return false;
}
