import React, { useState } from 'react'
import Home from './Home'

import { withRouter } from 'react-router-dom';
class App extends React.Component
{
  render () {
    const { match, location, history } = this.props
    return (
      <Home/>
    )
  }
}
export default withRouter(App);