import React from 'react'
import './styles/Nav.css'
import { Link } from 'react-router-dom'

export default function Nav(props){
  return (
    <nav role="navigation">
      <Link className='nav-link' to='/my-goals'> View goals</Link> 
      <Link className='nav-link' to='/log-in' > Log in</Link> 
      <Link className='nav-link' to='/sign-up'> Sign up</Link> 
      <Link className='nav-link' to='/about' > About</Link>
    </nav>
  )
}