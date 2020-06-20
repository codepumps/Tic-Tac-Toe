import React, { useState } from 'react';
import { useSpring, animated } from "react-spring";
import './App.css';

function App() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [initialValue, setinitialValue] = useState("X");
  const [squareCount, setsquareCount] = useState(0);
  const [reset, setreset] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState({
    winner: "",
    isWin: false
  });

  // spring animation
  const { x } = useSpring({ from: { x: 0 }, x: reset ? 1 : 0, config: { duration: 750 } });
  const opacityOn = useSpring({
    opacity: reset ? 1 : 0,
    config: { duration: 750 },
  });
  const opacityOff = useSpring({
    opacity: reset ? 0 : 1,
    config: { duration: 750 },
  });

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (results) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (results[a] && results[a] === results[b] && results[b] === results[c]) {
        const winnerr = results[a];
        setWinnerInfo({ winner: winnerr, isWin: true });
        // setinitialValue("X");
        // setsquareCount(0);
        //setSquares(Array(9).fill(null));
        setreset(!reset);
      }
    }
    console.log(squareCount);
    !winnerInfo.isWin && squareCount === 8 && setreset(true);
  }

  const handleReset = () => {
    setWinnerInfo(prevState => {
      return { ...prevState, isWin: false }
    });
    setinitialValue("X");
    setsquareCount(0);
    setSquares(Array(9).fill(null));
    setreset(false);
  }

  const handleClick = (index) => {
    if (reset || winnerInfo.isWin || squares[index]) return; //If it filled

    const newSquares = squares;
    if (initialValue === "X") {
      newSquares[index] = initialValue;
      setinitialValue("O");
    }
    else {
      newSquares[index] = initialValue;
      setinitialValue("X");
    }
    calculateWinner(squares);
    setsquareCount(squareCount + 1);
  }

  return (
    <div className="App">
      <header>
        <h1>Tic Tac Toe</h1>
        <p className="turn">
          It's turn {initialValue}
        </p>
      </header>
      <animated.div style={{
        opacity: x.interpolate({ range: [0, 1], output: [0.8, 1] }),
        transform: x
          .interpolate({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
          })
          .interpolate(x => `scale(${x})`)
      }} className="table">
        {!!squares && squares.map((square, index) => {
          return (
            <div onClick={() => handleClick(index)} key={index} className="square">
              {
                square
              }
            </div>
          )
        })}
      </animated.div>

      <animated.div style={reset ? opacityOn : opacityOff} className="result">
        {winnerInfo.isWin ? `Winner is ${winnerInfo.winner}` : null}
        {!winnerInfo.isWin && squareCount === 9 && `DRAW`}
      </animated.div>

      <animated.div style={reset ? opacityOn : opacityOff} className="reset">
        {reset ?
          <button onClick={() => handleReset()} type="submit" className="reset-btn">
            RESET
        </button> : null
        }
      </animated.div>
    </div>
  );
}

export default App;
