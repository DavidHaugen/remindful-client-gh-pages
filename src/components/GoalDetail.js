import React, { Component } from 'react'
import GoalsContext from '../context/GoalsContext'
import remindfulApiService from '../services/remindful-api-service';
import '../styles/GoalDetails.css'

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

  deleteReflection = (e) => {
    e.preventDefault();
    const id = e.target.id;
    remindfulApiService.deleteReflection(id)
    console.log(id)
    const targetReflection = this.state.reflections.filter((reflection) => reflection.id === Number(id));
    const newReflections = this.state.reflections;
    newReflections.splice(this.state.reflections.indexOf(targetReflection[0]), 1);
    this.setState({reflections: newReflections})
  }

  markGoalComplete = id => {
    const targetGoal = this.context.goals.filter((goal) => goal.id === Number(id));
    const updatedGoal = {...targetGoal[0]}
    updatedGoal.complete = !updatedGoal.complete
    remindfulApiService.markGoalComplete(updatedGoal)
    this.context.markGoalComplete(id)
  }

  componentDidMount (){
    remindfulApiService.getReflections(Number(this.props.match.params.goalId))
      .then(reflections => this.setState({reflections}))
  }
  

  render(){
    const reflections = this.state.reflections.map((reflection, key) =>{ 
      const date = new Date(reflection.date_created)
      return <li key={key}>
          <span className='reflectionDate'>Date: {(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()}</span><span className='reflectionContent'>{reflection.content}</span><button id={reflection.id} onClick={(e) => this.deleteReflection(e)}>delete</button>
        </li>
    }
    )
    let [goal] = this.context.goals.filter((goal) => (goal.id === Number(this.props.match.params.goalId)))
    return (
      <div>
        <h1>Your goal:</h1>
        <h2 className={
          (goal) ? 
          goal.complete ? 'complete' : 'inProgress' :
        null}>{
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
        <button onClick={() => this.markGoalComplete(this.props.match.params.goalId)}>Mark complete</button>

      </div>
    )
  }
}

export default GoalDetail