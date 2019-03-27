import React, { Component } from 'react'
import remindfulApiService from '../services/remindful-api-service';
import TokenService from '../services/token-service'
import GoalsContext from '../context/GoalsContext'

class AccountDeleted extends Component {
  static contextType = GoalsContext

  state = {
    deleted: false
  }

  componentWillUnmount(){
    this.context.resetUser()
  }

  deleteAccount = () => {
    remindfulApiService.deleteUser()
    .then(TokenService.clearAuthToken())
      .then(this.setState({deleted: true}))
  }
  
  render(){
    return (
      <div className="main">
        <div className="wrapper">
          <h4>{'Your account has been successfully deleted'}</h4>\
        </div>
      </div>
    )
  }
}

export default AccountDeleted;