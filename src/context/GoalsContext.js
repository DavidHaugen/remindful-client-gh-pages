import React from 'react'


const GoalsContext = React.createContext({
  goals: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setGoals: () => {}
})

export default GoalsContext
