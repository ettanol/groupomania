import '../styles/Home.css'
import React from 'react'

import Header from './Header'
import Members from './Members'
import Networking from './Networking'
import UserProvider from '../Context/User'

let userInfoString = localStorage.getItem('userInfo')
let userInfo = JSON.parse(userInfoString)

const Posts = () => {
  if(!userInfo || userInfo.token === undefined){window.location = "/"}
  else{
  return (
      <UserProvider className="Posts">
        <Header />
        <Networking />
        <Members />
      </UserProvider> 
  )}
}

export default Posts