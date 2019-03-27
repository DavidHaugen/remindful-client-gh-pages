import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import GoalsContext from '../context/GoalsContext'

class LogIn extends Component {
  static defaultProps = {
    onLoginSuccess: () => {    }
  }
  static contextType = GoalsContext

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
        this.props.history.push('/my-goals')
        this.context.getGoals()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render(){
    const { error } = this.state

    return(
      <div className="main">
        <div className="wrapper">
          <h1 className="karla">Welcome back!</h1>
          <p className="instructions">Please log in below:</p>
        <div className="formContainer">
          <form onSubmit={this.handleSubmitJwtAuth} className="inputForm">
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
            </div>
            <div className='formField'>
              <label htmlFor="login_email_address" className="inputLabel">Email address</label>
                <input name='email_address' type='email' id='login_email_address' className="inputField" required/>
            </div>
            <div className='formField'>
              <label htmlFor="password" className="inputLabel">Password</label>
                <input name='password' type='password' id='password' className="inputField" required/>
            </div>
            <button type='submit' className="textButton login">Log in</button>
          </form>
        </div>
        <p>Not signed up yet? {<Link className='signUpLink' to='/sign-up'>Sign up instead!</Link>}</p>
        </div>
      </div>
    )
  }
}

export default LogIn