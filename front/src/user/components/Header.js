/* eslint-disable react/jsx-filename-extension */
import { useState } from "react"
import React from "react"

import '../styles/Home.css'
import logo from '../assets/icon-left-font.png'
import { Link } from "react-router-dom"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    
  return (
    <header>
        <img src={logo} className="groupomania-logo" alt="logo de l'entreprise Groupomania"/>
        <div className="profile-image" onClick={() =>
        setIsOpen(isOpen ? false : true)
    } alt="profil utilisateur"/>
        {
        isOpen ? 
            <div className="profile-card">
                <h1 className="profile-name">John Doe</h1>
                <p className="profile-profession">web-developer</p>
                <Link to="/" className="profile-logout">Déconnexion</Link>
            </div> 
        : null
        }
    </header>
  )
}

export default Header