import React, { Component } from 'react'
import '../styles/About.css'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import GoalsContext from '../context/GoalsContext'

class About extends Component {

  static contextType = GoalsContext

  handleSubmitJwtAuth = () => {
    this.setState({ error: null })
    this.context.loadingTrue();
    AuthApiService.postLogin({
      email_address: 'remindfulTest@gmail.com',
      password: '!1Password',
    })
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        this.props.history.push('/my-goals')
        this.context.getGoals()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  handleClickTry = (e) => {
    e.preventDefault();
    this.handleSubmitJwtAuth()
  }

  render(){

    let trySection;
    if(!TokenService.hasAuthToken()){
      trySection = <section className="tryRemindful"><p>Want to try Remindful before you sign up? Click the button below to get started. Please note: this will log you in under a public test account. All changes made will be visible to anyone using the test account.</p><button className='textButton' onClick={(e) => {this.handleClickTry(e)}}>Try Remindful!</button></section>
    }

    if(this.context.loading){
      return (
        <div className="main">
          <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      )
    }else {

    return (
      <div className="main">
        <div className="wrapper">
          <header role="banner" className="banner">
            <h1 className="aboutHeader">Remindful</h1>
          </header>
          <div role='alert'>
              {this.context.error && <p className='red'>{this.context.error}</p>}
          </div>
          <section className='description'>
            <p>Remindful is meant to give you a space to track your long-term goals. It's here to provide you with a gentle nudge to stay on course to write that novel, learn a new instrument, or pick up the phone to call that old friend every now and then. On the first of every month you'll receive an email reminding you to check in with your goals and log your progress. </p>
          </section>
          <section className='details'>
            <p>It's easy to neglect long-term goals when you have so many things that need doing today. Sure, nothing bad would happen if you didn't dig that violin out of the closet, but wouldn't it feel good to finally nail the first few lines of that song you've always wanted to learn? </p>
          </section>
          {trySection}
        </div>
      </div>
    )
  }
  }
}

export default About;