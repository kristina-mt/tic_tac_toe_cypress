import React, { useState, useEffect } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState(null);
  const winner = calculateWinner(board);
  const winningSquares = winner ? getWinningSquares(board) : [];

  useEffect(() => {
    if (mode === "ai" && !isXNext && !winner && board.includes(null)) {
      aiMove();
    }
  }, [board, isXNext, winner, mode]);

  const handleClick = (index) => {
    if (board[index] || winner || !mode) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const aiMove = () => {
    if (winner || !board.includes(null)) return;

    const availableSpots = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
    if (availableSpots.length === 0) return;

    let bestMove;
    if (Math.random() < 0.7) {
      bestMove = availableSpots[0];
    } else {
      bestMove = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    }

    if (bestMove !== undefined) {
      setTimeout(() => {
        setBoard(prevBoard => {
          const newBoard = [...prevBoard];
          newBoard[bestMove] = "O";
          return newBoard;
        });
        setIsXNext(true);
      }, 500);
    }
  };

  const renderSquare = (index) => (
    <button className={`square ${winningSquares.includes(index) ? "winning-square glow" : ""}`} onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div id="root" className="game">
      <h1 className="logo">Tic-Tac-Toe</h1>
      <div className="card">
        {!mode ? (
          <div className="mode-selection">
            <button onClick={() => setMode("2player")}>2 Player Mode</button>
            <button onClick={() => setMode("ai")}>Play vs AI</button>
          </div>
        ) : (
          <>
            <div className="board">
              {[0, 1, 2].map((row) => (
                <div key={row} className="board-row">
                  {renderSquare(row * 3)}
                  {renderSquare(row * 3 + 1)}
                  {renderSquare(row * 3 + 2)}
                </div>
              ))}
            </div>
            <h2 className={`winner-text ${winner ? "glow" : ""}`}>{winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}</h2>
            <button className="reset" onClick={() => { setBoard(Array(9).fill(null)); setMode(null); setIsXNext(true); }}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
};

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const getWinningSquares = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c];
    }
  }
  return [];
};

export default App;