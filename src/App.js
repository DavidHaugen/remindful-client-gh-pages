import React, { Component } from 'react';
import './styles/App.css';
import { Route } from 'react-router-dom'
import Landing from './Landing'
import SignUp from './SignUp'
import SignIn from './LogIn'
import ViewGoals from './ViewGoals'
import GoalDetail from './GoalDetail'
import AddGoal from './AddGoal'
import config from './config'
import Nav from './Nav'

class App extends Component {
  state = {
    goals: [
    ]
  }


  componentDidMount (){
    const goals = () => fetch(`${config.API_ENDPOINT}/api/my-goals`)
    .then(res => !res.ok
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      .then(goals => this.setState({goals}))
      )
      
      goals()
  }

  render() {
    return (
      <div className="App">
        <Route path ='/' component = {Nav} />
        <Route path = '/about' component = {Landing} />
        <Route path='/sign-up' component = {SignUp} />
        <Route path='/log-in' component = {SignIn} />
        <Route 
          exact path='/my-goals' 
          render = {() => <ViewGoals goals = {this.state.goals} /> } />
        <Route
          path='/my-goals/:goalId' 
          render = {(match) => <GoalDetail goals = {this.state.goals} match = {match}/> }/>
        <Route path='/add-goal' component = {AddGoal} />
      </div>
    );
  }
}

export default App;
