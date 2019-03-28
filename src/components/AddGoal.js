import React, { Component } from 'react'
import remindfulApiService from '../services/remindful-api-service'
import GoalsContext from '../context/GoalsContext'

export default class AddGoal extends Component {

  static contextType = GoalsContext

  submitNewGoal = (e) => {
    e.preventDefault()
    this.context.loadingTrue();
    const name = e.target.name.value;
    remindfulApiService.postNewGoal(name)
      .then((goal) => this.context.addGoal(goal))
      .then(this.props.history.push('/my-goals'))
      .then(this.context.loadingFalse())
  }

  render(){
    // const { error } = this.state
    let error;

    return (
      <div className="main">
        <div className="wrapper">
          <h1>Let's create your new goal</h1>
          <div className="formContainer">
            <form className="inputForm" onSubmit={(e) => this.submitNewGoal(e)} >
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>
              <div className="formField">
                <label htmlFor="name" className="inputLabel">Name</label>
                  <input type='text' id = 'name' required className="inputField" ></input>
                <button type='submit'><i className="fas fa-plus-circle addGoalButton"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}