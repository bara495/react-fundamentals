// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  const countReducer = (state, changedState) => ({
    ...state,
    ...(typeof changedState === 'function'
      ? changedState(state)
      : changedState),
  })

  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state

  const increment = () =>
    setState(currentState => ({count: currentState.count + step}))

  return <button onClick={() => increment()}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
