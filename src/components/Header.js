import { useState } from "react"

import '../styles/Home.css'
import logo from '../assets/icon-left-font.png'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    
  return (
    <div className="Header">
        <img src={logo} className="groupomania-logo" alt="logo de l'entreprise Groupomania"/>
        <div className="profile-image" onClick={() =>
        setIsOpen(isOpen ? false : true)
    } alt="profil utilisateur"/>
        {
        isOpen ? 
            <div className="profile-card">
                <h1 className="profile-name">John Doe</h1>
                <p className="profile-profession">web-developer</p>
                <button className="profile-logout">Déconnexion</button>
            </div> 
        : null
        }
    </div>
  )
}

export default Header