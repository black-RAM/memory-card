import React from "react"

interface State {
  current: number,
  best: number
}

interface Action {
  type: "INCREMENT" | "RESET"
}

const scoreReducer: React.Reducer<State, Action> = (state, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return {...state, current: state.current + 1}
    case 'RESET': {
      let record = state.best
      if(state.current > record) record = state.current
      return {current: 0, best: record}
    }
  }
}

export default scoreReducer