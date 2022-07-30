import '../styles/Home.css'
import React from 'react'

import Header from './Header'
import Members from './Members'
import Networking from './Networking'
import UserProvider from '../Context/User'

const Posts = () => {
  return (
      <UserProvider className="Posts">
        <Header />
        <Networking />
        <Members />
      </UserProvider> 
  )
}

export default Posts