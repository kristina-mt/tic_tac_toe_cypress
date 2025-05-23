import React, { useState, useEffect } from "react";
import "./index.css"; // Ensure CSS is linked

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState(null);
  const winner = calculateWinner(board);
  const isDraw = board.every(cell => cell !== null) && !winner;
  const winningSquares = winner ? getWinningSquares(board) : [];

  useEffect(() => {
    if (mode === "ai" && !isXNext && !winner && board.includes(null)) {
      aiMove();
    }
  }, [board, isXNext, winner, mode]);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw || !mode) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };
  const aiMove = () => {
    if (winner || isDraw || !board.includes(null)) return;
  
    const availableSpots = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);
  
    // Winning move (AI wins)
    for (let i of availableSpots) {
      let newBoard = [...board];
      newBoard[i] = "O";
      if (calculateWinner(newBoard) === "O") {
        setBoard(newBoard);
        setIsXNext(true);
        return;
      }
    }
  
    // Blocking move (Stop Player from winning)
    for (let i of availableSpots) {
      let newBoard = [...board];
      newBoard[i] = "X";
      if (calculateWinner(newBoard) === "X") {
        newBoard[i] = "O";
        setBoard(newBoard);
        setIsXNext(true);
        return;
      }
    }
  
    // Prefer Center (Best strategic move)
    if (availableSpots.includes(4)) {
      setTimeout(() => {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[4] = "O";
          return newBoard;
        });
        setIsXNext(true);
      }, 500);
      return;
    }
  
    // Prefer Corners if available
    const corners = [0, 2, 6, 8].filter((c) => availableSpots.includes(c));
    if (corners.length > 0) {
      setTimeout(() => {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[corners[0]] = "O";
          return newBoard;
        });
        setIsXNext(true);
      }, 500);
      return;
    }
  
    // Otherwise, pick any available spot
    setTimeout(() => {
      const randomMove = availableSpots[Math.floor(Math.random() * availableSpots.length)];
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[randomMove] = "O";
        return newBoard;
      });
      setIsXNext(true);
    }, 500);
  };
  

  // Minimax Algorithm for AI strategy
  const getBestMove = (newBoard) => {
    let bestScore = -Infinity;
    let move;

    newBoard.forEach((cell, index) => {
      if (cell === null) {
        newBoard[index] = "O";
        let score = minimax(newBoard, 0, false);
        newBoard[index] = null;
        if (score > bestScore) {
          bestScore = score;
          move = index;
        }
      }
    });

    return move;
  };

  const minimax = (newBoard, depth, isMaximizing) => {
    const result = calculateWinner(newBoard);
    if (result === "O") return 10 - depth;
    if (result === "X") return depth - 10;
    if (!newBoard.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      newBoard.forEach((cell, index) => {
        if (cell === null) {
          newBoard[index] = "O";
          bestScore = Math.max(bestScore, minimax(newBoard, depth + 1, false));
          newBoard[index] = null;
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      newBoard.forEach((cell, index) => {
        if (cell === null) {
          newBoard[index] = "X";
          bestScore = Math.min(bestScore, minimax(newBoard, depth + 1, true));
          newBoard[index] = null;
        }
      });
      return bestScore;
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
            <div className="board" data-cy="board">
              {[0, 1, 2].map((row) => (
                <div key={row} className="board-row">
                  {renderSquare(row * 3)}
                  {renderSquare(row * 3 + 1)}
                  {renderSquare(row * 3 + 2)}
                </div>
              ))}
            </div>
            <h2 className={`winner-text ${winner || isDraw ? "glow" : ""}`}>
              {winner ? `Winner: ${winner}` : isDraw ? "Draw" : `Next Player: ${isXNext ? "X" : "O"}`}
            </h2>
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
