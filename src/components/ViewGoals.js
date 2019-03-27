import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/ViewGoals.css'
import Goal from './Goal'
import GoalsContext from '../context/GoalsContext';
import '../styles/main.css'


class ViewGoals extends Component {
  state = {
    goals: []
  }

  static contextType = GoalsContext

  createList(goals){
    return goals.map((goal, i) => <Goal key={i} goal={goal} history={this.props.history}/>)
  };

  render(){
    if(this.context.loading){
      return(
        // <h1>Checking on your goals!</h1>
        <div className="main">
          <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      )
    } else{
    
    if(this.context.goals.length > 0){

      return(
        <div className="main">
          <div className="wrapper">
            <ul className="listContainer">
            <div className="listHeader">
              <h1 className="listTitle">Your goals</h1>
              <Link to='/add-goal' className="addLink">
                <button className="button"><i className="fas fa-plus-circle"></i></button>
              </Link>
            </div>
            {this.createList(this.context.goals)}
            </ul>
          </div>
        </div>
      )

      }else {return(
        <div className="main">
          <div className="wrapper">
            <h1>It looks like you haven't added any goals yet. Click the button below to add your first goal.</h1>
            <Link to='/add-goal'>
            {/* <span style={{color: '#0A0908'}}>Add Goal </span> */}
              <button className="button"><i className="fas fa-plus-circle bigButton"></i></button>
            </Link>
          </div>
        </div>
      )
      }
    }
  }
}

export default ViewGoals