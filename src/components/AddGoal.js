import React, { Component } from 'react'
import remindfulApiService from '../services/remindful-api-service'
import GoalsContext from '../context/GoalsContext'

export default class AddGoal extends Component {

  static contextType = GoalsContext

  submitNewGoal = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    remindfulApiService.postNewGoal(name)
      .then((goal) => this.context.addGoal(goal))
    this.props.history.push('/my-goals')
  }

  render(){
    return (
      <div className="main">
        <div className="wrapper">
          <h1>New goal!</h1>
          <form className="addGoal" onSubmit={(e) => this.submitNewGoal(e)} >
            <label htmlFor="name" className="addGoalLabel">Name your goal:</label>
            <div className="formContainer">
              <input type='text' id = 'name' required className="addGoalInput" ></input>
            <button type='submit'><i className="fas fa-plus-circle addGoalButton"></i></button>
            </div>
        </form>
        </div>
      </div>
    )
  }
}