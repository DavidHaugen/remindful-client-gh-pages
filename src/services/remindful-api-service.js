import React from 'react'
import config from '../config.js'

const remindfulApiService = {
  postNewGoal (name){
    return fetch(`${config.API_ENDPOINT}/api/my-goals`, {
      method: 'POST',
      headers: {
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