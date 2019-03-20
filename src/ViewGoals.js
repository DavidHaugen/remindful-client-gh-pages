import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import './styles/ViewGoals.css'
import Goal from './Goal'

class ViewGoals extends Component {
  state = {
    goals: []
  }

  static getDerivedStateFromProps(props, state){
    if(props.goals.length !== state.goals.length){
      return {state: props.goals}
    }
  }

  createList(goals){
    return goals.map((goal, i) => <Goal key={i} goal={goal} />)
  };

  render(){
    console.log(this.props.goals)
    if(this.props.goals.length > 0){

      return(
        <div>
          <h1>Here are your goals</h1>
          <ul>
            {this.createList(this.props.goals)}
          </ul>
          <Link to='/add-goal' >
            <button>Add goal</button>
          </Link>
        </div>
      )

      }else {return(
        <div>
          <h1>It looks like you haven't added any goals yet. Time to get started!</h1>
          <Link to='/add-goal' >
            <button>Add goal</button>
          </Link>
        </div>
      )
      }
  }
}

export default withRouter(ViewGoals)