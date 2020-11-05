// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, restart, selectSquare}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div className="game-board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

const GameInfo = ({status, currentStep, stepsNr, handleSelectStep}) => {
  const numbers = [...Array(stepsNr).keys()]
  const buttons = numbers.map(number => (
    <button onClick={() => handleSelectStep(number)}>
      <li>{number}</li>
    </button>
  ))

  return (
    <div className="game-info">
      <div className="status">{status}</div>
      <ol>{buttons}</ol>
    </div>
  )
}

function Game() {
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'currentStep',
    () => {
      return 0
    },
  )

  const [squaresHistory, setSquaresHistory] = useLocalStorageState(
    'squaresHistory',
    () => {
      return [Array(9).fill(null)]
    },
  )

  const squares = squaresHistory[currentStep]

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (winner || squares[square]) return
    const updatedSquares = [...squares]
    updatedSquares[square] = nextValue
    setCurrentStep(currentStep + 1)
    const updatedSquaresHistory = [...squaresHistory, updatedSquares]
    setSquaresHistory(updatedSquaresHistory)
  }

  function restart() {
    setCurrentStep(0)
    setSquaresHistory([Array(9).fill(null)])
  }

  function handleSelectStep(stepNumber) {
    setCurrentStep(stepNumber)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board {...{squares, restart, selectSquare}} />
        <GameInfo
          {...{
            status,
            currentStep,
            stepsNr: squaresHistory.length,
            handleSelectStep,
          }}
        />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
