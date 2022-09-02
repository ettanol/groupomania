import React, {useState, useContext} from "react"

import big_logo from '../assets/icon-left-font.png'
import { UserContext } from "../Context/User"
import Profile from "./Profile"


const Header = () => {
  const { user } = useContext(UserContext)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header>
      <img src={big_logo} className="groupomania-logo" alt="logo de l'entreprise Groupomania"/>
        {<img className="profile-image" onClick={() =>{ //the user clicks on the image profile to reveal his infos
        setIsProfileOpen(isProfileOpen ? false : true)
      }} alt="profil utilisateur" src={user.profileImageUrl}/>}
        {
        isProfileOpen && <Profile/>
        }
    </header>
  )
}

export default Header