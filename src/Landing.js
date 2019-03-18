import React, { Component } from 'react'

class Landing extends Component {
  render(){
    return (
      <div>
        <header role="banner" className="banner">
          <h1>Remindful</h1>
        </header>
        <section className='description'>
          <p>Remindful is meant to give you a space to track your long-term goals. It's here to provide you with a gentle nudge to stay on course to write that novel, learn a new instrument, or pick up the phone to call that old friend every now and then. On the first of every month you'll receive an email reminding you to check in with your goals and log your progress. </p>
          <p><em>placeholder for a few list items</em></p>
        </section>
        <section className='details'>
          <p>It's easy to neglect long-term goals when you have so many things that need doing today. Sure, nothing bad would happen if you didn't dig that violin out of the closet, but wouldn't it feel good to finally nail the first few lines of that song you've always wanted to learn? </p>
          <p><em>placeholder for a few list items with details expanded for a goal</em></p>
        </section>
      </div>
    )
  }
}

export default Landing;