import React, { Component } from 'react';
import '../styles/App.css';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import About from './About'
import SignUp from './SignUp'
import SignIn from './LogIn'
import ViewGoals from './ViewGoals'
import GoalDetail from './GoalDetail'
import AddGoal from './AddGoal'
import Header from './Header'
import GoalsContext from '../context/GoalsContext';
import remindfulApiService from '../services/remindful-api-service'
import Account from './Account';
import AccountDeleted from './AccountDeleted';
import TokenService from '../services/token-service'
import NotFound from './NotFound'


class App extends Component {
  state = {

      error: null,

      goals: [],

      loading: false,

      deletedUser: false,

      deleteGoal: (id) => {
        const targetGoal = this.state.goals.filter((goal) => goal.id === Number(id));
        const newGoals = this.state.goals;
        newGoals.splice(this.state.goals.indexOf(targetGoal[0]), 1);
        this.setState({goals: newGoals})
      },

      clearGoals: () => {
        this.setState({goals: []})
      },
      
      getGoals: () => {
        this.state.loadingTrue()
        this.state.clearError();
        remindfulApiService.getAllGoals()
        .then(goals => {
          this.setState({goals})
          this.state.loadingFalse()
        })
        .catch(res => {this.setState({error: res.error}); this.state.loadingFalse()})
      },

      markGoalComplete: (id) => {
        const targetGoal = this.state.goals.filter((goal) => goal.id === Number(id))[0];
        const updatedGoal = {...targetGoal};
        updatedGoal.complete = !updatedGoal.complete;
        const newGoals = this.state.goals;
        newGoals.splice(this.state.goals.indexOf(targetGoal), 1, updatedGoal);
        this.setState({goals: newGoals});
      },

      deleteUser: () => {
        this.setState({deletedUser: true})
      },

      resetUser: () => {
        this.setState({deletedUser: false})
      },

      addGoal: (goal) => {
        this.setState({goals: [...this.state.goals, goal]})
      },

      loadingTrue: () => {
        this.setState({loading: true})
      },

      loadingFalse: () => {
        this.setState({loading: false})
      },

      clearError: () => {
        this.setState({error: null})
      },

      setError: (err) => {
        this.setState({error: err.message})
      }
    }

  componentDidMount (){
    if(TokenService.hasAuthToken()){
      this.state.getGoals()
    }
  }

  render() {
    return (
      <div className="App">
        <GoalsContext.Provider value={this.state}>
          <Route path ='/' component = {Header} />
          <Switch>
            <PublicOnlyRoute
              exact path={'/log-in'}
              component={SignIn}
            />
            <PublicOnlyRoute
              exact path={'/sign-up'}
              component={SignUp}
            />
            <PrivateRoute
              exact path={'/my-goals'} 
              component={ViewGoals}
            />
            <PrivateRoute 
              path={'/my-goals/:goalId'}
              component={GoalDetail}
            />
            <PrivateRoute 
              exact path={'/add-goal'} 
              component = {AddGoal}
            />
            <PrivateRoute
              exact path={'/account'} 
              component={Account}
            />
            <Route 
              exact path = {'/about'} 
              component = {About} 
            />
            <Route 
            exact path = {'/'}
            component = {About}
            />
            <Route 
            exact path ='/account-deleted' 
            component={AccountDeleted} 
            />
            <Route
              component={NotFound}
            />
          </Switch>
        </GoalsContext.Provider>
      </div>
    );
  }
}

export default App;
