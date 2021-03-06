// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()

function Toggle({onToggle, children}) {
  return <ToggleProvider>{children}</ToggleProvider>
}

const ToggleProvider = props => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return <ToggleContext.Provider value={[on, toggle]} {...props} />
}

const useToggle = () => {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error('useToggle must be rendered within the ToggleProvider')
  }
  return context
}

function ToggleOn({children}) {
  const [on] = useToggle()
  return on ? children : null
}

function ToggleOff({children}) {
  const [on] = useToggle()
  return on ? null : children
}

function ToggleButton({...props}) {
  const [on, toggle] = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

// BONUS 1 task - provides a nice error already thanks to previous enhancements
// const App = () => <ToggleButton />

export default App

/*
eslint
  no-unused-vars: "off",
*/
