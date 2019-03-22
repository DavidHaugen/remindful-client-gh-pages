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
  },

  deleteGoal(goalId){
    return fetch(`${config.API_ENDPOINT}/api/my-goals`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        goalId: goalId
      }),
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : null
      )
  },

  postNewReflection(goalId, reflection){
    return fetch(`${config.API_ENDPOINT}/api/reflections`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        goalId, reflection
      }),
    })
    .then( res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },

  deleteReflection(id){
    return fetch(`${config.API_ENDPOINT}/api/reflections`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id
      }),
    })
    .then( res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : null
      ) 
  },

  getReflections(goalId){
    return fetch(`${config.API_ENDPOINT}/api/reflections/${goalId}`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res => !res.ok
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      ) 
  },

  markGoalComplete(goal){
    return fetch(`${config.API_ENDPOINT}/api/my-goals`, {
      method: 'PATCH',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: goal.name,
        reflections: goal.reflections,
        complete: goal.complete,
        id: goal.id
      }),
    })
    .then(res => !res.ok
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      ) 
  }
}
export default remindfulApiService