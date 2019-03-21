import React, { Component } from 'react'
import GoalsContext from './context/GoalsContext'
import remindfulApiService from './services/remindful-api-service';

class GoalDetail extends Component {

  static contextType = GoalsContext

  state = {
    isEditable: false,
    reflections: []
  }

  submitReflection = e => {
    e.preventDefault();
    const {reflections} = e.target
    const goalId = this.props.match.params.goalId
    remindfulApiService.postNewReflection(goalId, reflections.value)
    .then(reflection => this.setState({reflections: [...this.state.reflections, reflection]}))
    .then(document.getElementById('reflectionsForm').reset())
  }

  deleteGoal = goal => {
    remindfulApiService.deleteGoal(goal);
    this.context.deleteGoal(goal);
    this.props.history.push('/my-goals');
  }

  componentDidMount (){
    remindfulApiService.getReflections(Number(this.props.match.params.goalId))
      .then(reflections => this.setState({reflections}))
  }
  

  render(){
    const reflections = this.state.reflections.map((reflection, key) =>{ 
      const date = new Date(reflection.date_created)
      return <li key={key}>
          <span className='reflectionDate'>Date: {(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()}</span><span className='reflectionContent'>{reflection.content}</span><button id={reflection.id}>delete</button>
        </li>
    }
    )
    let [goal] = this.context.goals.filter((goal) => (goal.id === Number(this.props.match.params.goalId)))
    return (
      <div>
        <h1>Your goal:</h1>
        <h2>{
          (goal) ? 
          goal.name : null}</h2>
        <h3>Reflections on this goal:</h3>
        <ul>
          {reflections}
        </ul>
          <form id='reflectionsForm' onSubmit={(e)=>this.submitReflection(e)}>
            <input id='reflections' name='reflections' >
                </input>
            <button type='submit' >Submit reflection</button>
          </form>
        <button onClick={() => this.deleteGoal(this.props.match.params.goalId)}>Delete goal</button>
        <button >Mark complete</button>

      </div>
    )
  }
}

export default GoalDetail