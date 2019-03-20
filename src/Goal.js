import React, {Component } from 'react'
import { Link } from 'react-router-dom'

export default class Goal extends Component{
  style = this.props.goal.complete ? 'line-through' : 'none currentcolor solid'

  render(){

    return (
      <div>
        <Link to={`/my-goals/${this.props.goal.id}`}>
          <li style={{textDecoration: this.style}}>{this.props.goal.name}</li>
        </Link>
      </div>
    )
  }
}