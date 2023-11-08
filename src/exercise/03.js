// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// 🐨 create your CountContext here with React.createContext
const CountContext = React.createContext()

// 🐨 create a CountProvider component here that does this:
function CountProvider(props) {
  //   🐨 get the count state and setCount updater with React.useState
  const [count, setCount] = React.useState(0)

  //   🐨 create a `value` array with count and setCount
  const value = [count, setCount]

  //   🐨 return your context provider with the value assigned to that array and forward all the other props
  //   💰 more specifically, we need the children prop forwarded to the context provider
  return <CountContext.Provider value={value} {...props} />
}

function UseCount() {
  const providerValue = React.useContext(CountContext)

  if (!providerValue) {
    throw new Error('UseCount must be used in the count context')
  }

  const [count, setCount] = providerValue

  return [count, setCount]
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const [count] = UseCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const [, setCount] = UseCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      {/*
        🐨 wrap these two components in the CountProvider so they can access
        the CountContext value
      */}
      <CountProvider>
        {/* components using UseCount need to go here to prevent error */}
      </CountProvider>
      <CountDisplay />
      <Counter />
    </div>
  )
}

export default App
