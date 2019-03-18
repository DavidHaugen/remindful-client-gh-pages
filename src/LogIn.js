import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class LogIn extends Component {
  render(){
    return(
      <div>
        <h2>Welcome back!</h2>
        <h3>Please log in below:</h3>
        <form>
          <div>
            <label>Email address
              <input />
            </label>
          </div>
          <div>
            <label>Password
              <input type='password'/>
            </label>
          </div>
          <button type='submit'>Submit</button>
        </form>
    <p>Not signed up yet? {<Link className='nav-link' to='/sign-up'> Sign up instead!</Link>}</p>
      </div>
    )
  }
}

export default LogIn