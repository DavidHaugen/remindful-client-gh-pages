import React, { Component } from 'react'

class GoalDetail extends Component {
  goal = this.props.goals[this.props.match.match.params.goalId-1]

  render(){
      console.log(this.goal)
    return (
      <div>

        <h1>Your goal:</h1>
        <h2>{this.goal.name}</h2>
        <h3>Reflections on this goal:</h3>
        <textarea>{this.goal.reflections}</textarea>
      </div>
    )
  }
}

export default GoalDetail