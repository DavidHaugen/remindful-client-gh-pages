import React, { Component } from 'react'


const GoalsContext = React.createContext({
  goals: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setGoals: () => {}
})

export default GoalsContext

export class GoalsProvider extends Component {
  state = {
    goals: [],
    error: null,
  };

  setGoals = goals => {
    this.setState({ goals })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      goals: this.state.goals,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setGoals: this.setGoals
    }

    return (
      <GoalsContext.Provider value={value}>
        {this.props.children}
      </GoalsContext.Provider>
    )
  }
}