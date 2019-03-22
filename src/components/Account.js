import React, { Component } from 'react'
import remindfulApiService from '../services/remindful-api-service';
import TokenService from '../services/token-service'
import GoalsContext from '../context/GoalsContext'

class Account extends Component {
  static contextType = GoalsContext

  state = {
    deleted: false
  }

  deleteAccount = () => {
    remindfulApiService.deleteUser()
    .then(TokenService.clearAuthToken())
      .then(this.context.deleteUser())
      .then(this.props.history.push('/account-deleted'))
  }
  render(){
    return (
      <div>
        <button onClick={() => this.deleteAccount()}>Delete my account</button>
      </div>
    )
  }
}

export default Account;