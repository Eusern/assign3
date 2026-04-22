import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [selected, setSelected] = useState(null);
  const xCount = square.filter((s) => s === "X").length;
  const oCount = square.filter((s) => s === "O").length;
  const currentPiece = xIsNext ? "X" : "O";
  const currentCount = xIsNext ? xCount : oCount;
  const isMovingPhase = currentCount >= 3;

  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }
    if (!isMovingPhase){
      if (squares[i]){
        return;
      }
        const nextSquares = square.slice();
        nextSquares[i] = currentPiece;
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }
    else{
      if (selected === null){
        if (squares[i] !== currentPiece){
          return;
        }
        setSelected(i);
      }
      else{
        if (i === selected) {
          setSelected(null);
          return;
        }
        if (squares[i] === currentPiece) {
          setSelected(i);
          return;
        }
        if (squares[i] !== null){
          setSelected(null);
          return;
        }
        if (!isAdjacent(selected, i)) {
          setSelected(null);
          return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = currentPiece;
        nextSquares[selected] = null;
        if (squares[4] === currentPiece) {
          const wins = calculateWinner(nextSquares);
          const vacatesCenter = selected === 4;
          if (!wins && !vacatesCenter) {
            setSelected(null);
            return;
          }
        }
        setSquares(nextSquares);
        setSelected(null);
        setXIsNext(!xIsNext);
      }
    }
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isMovingPhase) {
    status = selected !== null
      ? "Next player: " + currentPiece + " - now click destination"
      : "Next player: " + currentPiece + " - select a piece to move";
  } else {
    status = "Next player: " + currentPiece;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} highlight={selected === 0} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} highlight={selected === 1} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} highlight={selected === 2} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} highlight={selected === 3} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} highlight={selected === 4} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} highlight={selected === 5} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} highlight={selected === 6} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} highlight={selected === 7} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} highlight={selected === 8} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function isAdjacent(a, b) {
  const rowA = Math.floor(a / 3), colA = a % 3;
  const rowB = Math.floor(b / 3), colB = b % 3;
  return Math.abs(rowA - rowB) <= 1 && Math.abs(colA - colB) <= 1;
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
