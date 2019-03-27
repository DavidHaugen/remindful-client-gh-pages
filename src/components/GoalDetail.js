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
    const {reflectionsInput} = e.target
    const goalId = this.props.match.params.goalId
    remindfulApiService.postNewReflection(goalId, reflectionsInput.value)
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
    this.context.loadingTrue();
    remindfulApiService.getReflections(Number(this.props.match.params.goalId))
      .then(reflections => this.setState({reflections}))
      .then(this.context.loadingFalse());
  }
  

  render(){
    let error;

    const reflections = this.state.reflections.map((reflection, key) =>{ 
      const date = new Date(reflection.date_created)
      return <li key={key} className="reflection">
          <span className='reflectionDate'>{(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()}</span><span className='reflectionContent'>{reflection.content}</span>
          <i className="fas fa-trash" onClick={(e) => this.deleteReflection(e)}></i>
        </li>
    })
    let [goal] = this.context.goals.filter((goal) => (goal.id === Number(this.props.match.params.goalId)))

    if(this.context.loading){
      return (
        <div className="main">
        <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
      )
    } else {
    return (
      <div className="main">
        <div className="wrapper">
          <div className="goalTitle">
            <h1 className={
              (goal) ? 
              goal.complete ? 'complete' : 'inProgress' :
              null}>{
              (goal) ? 
              goal.name : null}</h1>
              <div className="goalButtons">
                <div className="trashContainer" onClick={() => this.deleteGoal(this.props.match.params.goalId)}>
                  <i className="fas fa-trash"></i>
                </div>
                <div className="checkContainer" onClick={() => this.markGoalComplete(this.props.match.params.goalId)}>
                  <i className="fas fa-check-circle" ></i>
                </div>
              </div>
          </div>
          <ul className="listContainer">
            {reflections.length > 0 ? reflections : <div className="empty"><p>No reflections yet.</p>Get started by adding a reflection below!</div>}
          </ul>
            <div className="formContainer">
              <form onSubmit={(e)=>this.submitReflection(e)} className="inputForm">
                <div role='alert'>
                  {error && <p className='red'>{error}</p>}
                </div>
                <div className="formField">
                  <label htmlFor="reflectionsInput" id="addReflectionLabel" className="inputLabel">Reflection</label>
                  <input id='reflectionsInput' name='reflectionsInput' className="inputField" required></input>
                  <button type='submit' ><i className="fas fa-plus-circle" id="reflectionButton" type="button"></i></button>
                </div>
              </form>
            </div>
          </div>
      </div>
    )}
  }
}

export default GoalDetail