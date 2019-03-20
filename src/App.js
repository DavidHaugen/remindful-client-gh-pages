import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './Utils/PrivateRoute'
import PublicOnlyRoute from './Utils/PublicOnlyRoute'
import Landing from './Landing'
import SignUp from './SignUp'
import SignIn from './LogIn'
import ViewGoals from './ViewGoals'
import GoalDetail from './GoalDetail'
import AddGoal from './AddGoal'
import config from './config'
import TokenService from './services/token-service'
import Nav from './Nav'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      goals: []
    }
  }

  componentDidMount (){
    return fetch(`${config.API_ENDPOINT}/api/my-goals`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    })
    .then(res => !res.ok
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      .then(goals => this.setState({goals}))
      ) 
  }

  addGoal = (goal) => {
    this.setState({goals: [...this.state.goals, goal]})
  }

  render() {
    return (
      <div className="App">
        <Route path ='/' component = {Nav} />
        <Route path = '/about' component = {Landing} />
        <Switch>
          <PublicOnlyRoute
                path={'/log-in'}
                component={SignIn}
          />
          <PublicOnlyRoute
                path={'/sign-up'}
                component={SignUp}
          />
          <PrivateRoute
              exact path={'/my-goals'} 
              component={ViewGoals}
              componentProps={{goals:this.state.goals}}
          />
          <PrivateRoute 
            path={'/my-goals/:goalId'}
            component={GoalDetail}
            componentProps={{goals:this.state.goals}}
          />
          <PrivateRoute 
            path={'/add-goal'} 
            component = {AddGoal}
            componentProps={{addGoal:this.addGoal}}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
