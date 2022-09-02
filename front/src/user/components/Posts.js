import '../styles/Home.css'
import React from 'react'

import Header from './Header'
import Members from './Members'
import Networking from './Networking'
import UserProvider from '../Context/User' //gets the user info and use it as context

let userInfoString = localStorage.getItem('userInfo')
let userInfo = JSON.parse(userInfoString) //get the user info from the localstorage and get it to verify token

const Posts = () => {
  if(!userInfo || userInfo.token === undefined){window.location = "/"} //if the user info doesn't exist or is undefined
  else{
  return ( //header, networking, and members section can use userContext as children of userProvider
      <UserProvider className="Posts"> 
        <Header />
        <Networking />
        <Members />
      </UserProvider> 
  )}
}

export default Posts