// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  function countReducer(state, newState) {
    return newState
  }

  function countReducerExtraCredit1(state, newState) {
    return state + newState
  }

  function countReducerExtraCredit2(state, newState) {
    return {...state, ...newState}
  }

  function countReducerExtraCredit3(state, newState) {
    return typeof newState === 'function'
      ? newState(state)
      : {...state, ...newState}
  }

  function countReducerExtraCredit4(state, action) {
    console.log('into reducer')
    if (typeof action === 'function') {
      return action(state)
    }

    console.log('past function check')

    switch (action.type) {
      case 'increment':
        console.log('into switch of type increment')
        return {...state, count: state.count + action.step}
      default:
        throw new Error(`unhandled action type: ${action.type}`)
    }
  }

  const [state, dispatch] = React.useReducer(countReducerExtraCredit4, {
    count: initialCount,
  })

  const {count} = state

  const increment1 = {type: 'increment', step}

  // const increment = () => dispatch({count: count + step});
  // const incrementExtra3 = () => dispatch(state => ({count: state.count + step}));
  const incrementExtra4 = () => dispatch(increment1)
  return <button onClick={incrementExtra4}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
