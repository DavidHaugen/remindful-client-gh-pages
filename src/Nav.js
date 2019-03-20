import React, {Component} from 'react'
import './styles/Nav.css'
import { Link } from 'react-router-dom'
import TokenService from './services/token-service'

export default class Nav extends Component {
  
  handleSignOutClick = () => {
    TokenService.clearAuthToken()
  }

  render() {if(TokenService.hasAuthToken()){
    return(
    <nav role="navigation">
      <Link className='nav-link' to='/my-goals'> View goals</Link> 
      {/* <Link className='nav-link' to='/log-in' > Log in</Link> 
      <Link className='nav-link' to='/sign-up'> Sign up</Link>  */}
      <Link className='nav-link' to='/about' > About</Link>
      <Link className='nav-link' to='/log-in' onClick={this.handleSignOutClick}>Sign out</Link>
    </nav>
    )}else return (
      <nav role="navigation">
        <Link className='nav-link' to='/my-goals'> View goals</Link> 
        <Link className='nav-link' to='/log-in' > Log in</Link> 
        <Link className='nav-link' to='/sign-up'> Sign up</Link> 
        <Link className='nav-link' to='/about' > About</Link>
      </nav>
    )
  }
}