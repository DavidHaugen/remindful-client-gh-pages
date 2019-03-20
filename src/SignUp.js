import React, { Component } from 'react'
import AuthApiService from './services/auth-api-service'

class SignUp extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, last_name, email_address, password } = ev.target
    this.setState({ error: null })
    AuthApiService.postUser({
      email_address: email_address.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
    })
      .then(user => {
        first_name.value = ''
        last_name.value = ''
        email_address.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render(){
    const { error } = this.state

    return(
      <div> 
        <h2>Welcome to Remindful</h2>
        <h3>Please enter your email address and password to get started</h3>
        <h4>We will use this email address to send you a reminder to check in and reflect on your progress on the first of every month</h4>
        <form onSubmit={this.handleSubmit}>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
          <div className='first_name'>
            <label>First name
              <input name='first_name' type='text' id='signUp_first_name' required/>
            </label>
          </div>
          <div>
            <label>Last name
              <input name='last_name' type='text' id='signUp_last_name' required/>
            </label>
          </div>
          <div>
            <label>Email address
              <input name='email_address' type='email' id='signUp_email_address' required/>
            </label>
          </div>
          <div>
            <label>Password
              <input name='password' type='password' id='password' required/>
            </label>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>    
    )
  }
}

export default SignUp