import React, { Component } from 'react'
import remindfulApiService from './services/remindful-api-service'

export default class AddGoal extends Component {
  submitNewGoal = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    remindfulApiService.postNewGoal(name)
      .then((goal) => this.props.addGoal(goal))
    this.props.history.push('/my-goals')
  }

  render(){
    return (
      <div>
        <form onSubmit={(e) => this.submitNewGoal(e)}>
          <label>Name your goal:
            <input type='text' id = 'name' ></input>
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}