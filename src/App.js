import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const current = history[stepNumber];

  const winner = calculateWinner(current.squares);
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  let status;
  // eslint-disable-next-line no-unused-vars
  status = winner ? 'Winner : ' + winner : `Nest player:${xIsNext ? 'X' : 'O'}`;

  const handleClick = (i) => {
    const newHistory = history.slice(0, history.length + 1);
    const newCurrent = newHistory[history.length - 1];
    const newSquares = newCurrent.squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext((current) => !current);
    setStepNumber(newHistory.length);
  };

  const moves = history.map((_, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game Start';
    return (
      <li key={move}>
        <button className='move-btn' onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  return (
    <div class='game'>
      <div div class='game-board'>
        <img src={logo} alt='logo' style={{ width: '100px' }} />
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div class='game-info'>
        <div className='status'>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
