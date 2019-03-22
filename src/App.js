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
import Nav from './Nav'
import GoalsContext from './context/GoalsContext';
import remindfulApiService from './services/remindful-api-service'

class App extends Component {
  state = {
      goals: [],

      loading: true,

      deleteGoal: (id) => {
        const targetGoal = this.state.goals.filter((goal) => goal.id === id);
        const newGoals = this.state.goals;
        newGoals.splice(this.state.goals.indexOf(targetGoal[0]), 1);
        this.setState({goals: newGoals})
      },

      clearGoals: () => {
        this.setState({goals: []})
      },
      
      getGoals: () => {
        remindfulApiService.getAllGoals()
        .then(goals => {
          this.setState({loading: false})
          this.setState({goals})
        })
      },

      markGoalComplete: (id) => {
        const targetGoal = this.state.goals.filter((goal) => goal.id === Number(id))[0];
        const updatedGoal = {...targetGoal};
        updatedGoal.complete = !updatedGoal.complete;
        const newGoals = this.state.goals;
        newGoals.splice(this.state.goals.indexOf(targetGoal), 1, updatedGoal);
        this.setState({goals: newGoals});
      }
    }

  componentDidMount (){
    this.state.getGoals()
  }

  addGoal = (goal) => {
    this.setState({goals: [...this.state.goals, goal]})
  }

  render() {
    return (
      <div className="App">
        <GoalsContext.Provider value={this.state}>
          <Route path ='/' component = {Nav} />
          <Route exact path = '/' component = {Landing} />
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
        </GoalsContext.Provider>
      </div>
    );
  }
}

export default App;
