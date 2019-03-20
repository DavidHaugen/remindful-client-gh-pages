import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AuthApiService from './services/auth-api-service'
import TokenService from './services/token-service'

class LogIn extends Component {
  static defaultProps = {
    onLoginSuccess: () => {    }
  }

  state = { error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { email_address, password } = ev.target
 
    AuthApiService.postLogin({
      email_address: email_address.value,
      password: password.value,
    })
      .then(res => {
        email_address.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        // this.props.onLoginSuccess()
        this.props.history.push('/my-goals')
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render(){
    const { error } = this.state

    return(
      <div>
        <h2>Welcome back!</h2>
        <h3>Please log in below:</h3>
        <form onSubmit={this.handleSubmitJwtAuth}>
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
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
          <button type='submit'>Login</button>
        </form>
    <p>Not signed up yet? {<Link className='nav-link' to='/sign-up'> Sign up instead!</Link>}</p>
      </div>
    )
  }
}

export default LogIn