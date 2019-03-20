import React, { Component } from 'react'

class GoalDetail extends Component {

  render(){
    let [goal] = this.props.goals.filter((goal) => (goal.id === Number(this.props.match.params.goalId)))

    return (
      <div>
        <h1>Your goal:</h1>
        <h2>{
          (goal) ? 
          goal.name : null}</h2>
        <h3>Reflections on this goal:</h3>
        <textarea>{
          (goal) ? 
          goal.reflections : null}</textarea>
      </div>
    )
  }
}

export default GoalDetail