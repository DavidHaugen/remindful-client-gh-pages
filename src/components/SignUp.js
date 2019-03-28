import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import { Link } from 'react-router-dom'
import '../styles/SignUp.css'
import GoalsContext from '../context/GoalsContext'

class SignUp extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  static contextType = GoalsContext

  state = { 
    error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, last_name, email_address, password } = ev.target
    this.setState({ error: null })
    this.context.loadingTrue()
    AuthApiService.postUser({
      email_address: email_address.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
    })
      .then(() => {
        first_name.value = ''
        last_name.value = ''
        email_address.value = ''
        password.value = ''
        this.props.history.push('/my-goals')
        this.context.loadingFalse()
      })
      .catch(res => {
        this.setState({ error: res.error })
        this.context.loadingFalse()
      })
  }

  render(){
    const { error } = this.state

    if(this.context.loading){
    return(
      <div className="main">
        <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    )
    } else{

    return(
      <div className="main"> 
        <div className="wrapper">
          <h1 className="karla">Welcome to Remindful</h1>
          <p className="instructions">Please enter your email address and password to get started</p>
          <p className="instructions">We will use this email address to send you a reminder to check in and reflect on your progress on the first of every month</p>
          <div className="formContainer">
            <form onSubmit={this.handleSubmit} className="inputForm">
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>
              <div className='formField'>
                <label className="inputLabel" htmlFor="signUp_first_name">First name</label>
                  <input name='first_name' type='text' id='signUp_first_name' className="inputField" required />
              </div>
              <div className='formField'>
                <label className="inputLabel" htmlFor="signUp_last_name">Last name</label>
                  <input name='last_name' type='text' id='signUp_last_name' className="inputField" required/>
              </div>
              <div className='formField'>
                <label className="inputLabel" htmlFor="signUp_email_address">Email</label>
                  <input name='email_address' type='email' id='signUp_email_address' className="inputField" required/>
              </div>
              <div className='formField'>
                <label className="inputLabel" htmlFor="password">Password</label>
                  <input name='password' type='password' id='password' className="inputField" required/>
              </div>
              <button type='submit' className="textButton login">Sign up</button>
            </form>
          </div>
          <section className="instructions">
            <p>Want to try Remindful before signing up? See our {<Link className='aboutLink' to='/about'>About page!</Link>}</p>
          </section>
        </div>
      </div>    
    )
  }
  }
}

export default SignUp