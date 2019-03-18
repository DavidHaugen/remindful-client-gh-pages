import React, { Component } from 'react'

class SignUp extends Component {
  render(){
    return(
      <div> 
        <h2>Welcome to Remindful</h2>
        <h3>Please enter your email address and password to get started</h3>
        <h4>We will use this email address to send you a reminder to check in and reflect on your progress on the first of every month</h4>
        <form>
          <div>
            <label>First name
              <input />
            </label>
          </div>
          <div>
            <label>Last name
              <input />
            </label>
          </div>
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
          <div>
            <label>Confirm password
              <input type='password'/>
            </label>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>    
    )
  }
}

export default SignUp