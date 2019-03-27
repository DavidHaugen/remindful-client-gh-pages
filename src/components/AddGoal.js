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
    // const { error } = this.state
    let error;
    return (
      <div className="main">
        <div className="wrapper">
          <h1>New goal!</h1>
          <div className="formContainer">
            <form className="inputForm" onSubmit={(e) => this.submitNewGoal(e)} >
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>
              <label htmlFor="name" className="inputLabel">Name your goal:</label>
                <input type='text' id = 'name' required className="inputField" ></input>
              <button type='submit'><i className="fas fa-plus-circle addGoalButton"></i></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}