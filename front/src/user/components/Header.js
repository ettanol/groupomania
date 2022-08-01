import React, {useState, useContext} from "react"
import axios from "axios"

import big_logo from '../assets/icon-left-font.png'
import { UserContext } from "../Context/User"
import Profile from "./Profile"

const Header = () => {
  const { user } = useContext(UserContext)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  let userInfoString = localStorage.getItem('userInfo')
  let userInfo = JSON.parse(userInfoString)

  const logout = () => {
    axios.post('http://localhost:5000/api/auth/logout',
    {
        email: user.email
    },
    {
        headers: {
            authorization: userInfo.token
      }
    })
    .then(() => {
        window.location = '/'
    })
    .catch(err => console.error(err))
  }

  const updateProfile = (image, password, profileSelected) => {
    let formData = new FormData()
    profileSelected && formData.append('image', image)
    password && formData.append('password', password)
    axios.put(`http://localhost:5000/api/auth/user/${user.email}`,
    formData, 
    {
      headers: {
        authorization: userInfo.token
      }
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => console.error(err))
  }
    
  return (
    <header>
      <img src={big_logo} className="groupomania-logo" alt="logo de l'entreprise Groupomania"/>
        {<img className="profile-image" onClick={() =>{
        setIsProfileOpen(isProfileOpen ? false : true)
      }} alt="profil utilisateur" src={user.profileImageUrl}/>}
        {
        isProfileOpen && <Profile logout={logout} updateProfile={updateProfile}/>
        }
    </header>
  )
}

export default Header