import config from '../config.js'
import TokenService from './token-service'

const remindfulApiService = {
  getAllGoals(){
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
  },

  postNewGoal (name){
    return fetch(`${config.API_ENDPOINT}/api/add-goal`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      }),
    })
    .then( res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  }
}

export default remindfulApiService