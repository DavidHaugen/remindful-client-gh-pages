import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/ViewGoals.css'
import Goal from './Goal'
import GoalsContext from '../context/GoalsContext';

class ViewGoals extends Component {
  state = {
    goals: []
  }

  static contextType = GoalsContext

  createList(goals){
    return goals.map((goal, i) => <Goal key={i} goal={goal} />)
  };

  render(){
    if(this.context.loading){
      return(
        // <h1>Checking on your goals!</h1>
        <div></div>
      )
    } else{
    
    if(this.context.goals.length > 0){

      return(
        <div>
          <h1>Here are your goals</h1>
          <ul>
            {this.createList(this.context.goals)}
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
}

export default ViewGoals