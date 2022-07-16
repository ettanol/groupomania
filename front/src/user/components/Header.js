/* eslint-disable react/jsx-filename-extension */
import React, {useState, useEffect } from "react"
import axios from "axios"

// import '../styles/Home.css'
import logo from '../assets/icon-left-font.png'
import { Link } from "react-router-dom"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)

    let userInfoString = localStorage.getItem('userInfo')
    let userInfo = JSON.parse(userInfoString)

    useEffect(() => {
      getUserAccount(userInfo.email)
    }, [])
    

    const getUserAccount = (email) => {
        axios
          .get(`http://localhost:5000/api/auth/user/${email}`,{
            headers: {
                authorization: userInfo.token
            }
          })
          .then(user => {
              setIsLoaded(true)
              setUser(user.data)
          })
          .catch(error => setError(true))
    }
    
  return (
    <header>
        <img src={logo} className="groupomania-logo" alt="logo de l'entreprise Groupomania"/>
        <div className="profile-image" onClick={async () =>{
        setIsOpen(isOpen ? false : true)
        // getUserAccount(userInfo[0])
    }} alt="profil utilisateur"/>
        {
        isOpen ? 
            <div className="profile-card">
                <h1 className="profile-name">{userInfo.firstName} {userInfo.lastName}</h1>
                <p className="profile-profession">{userInfo.profession}</p>
                <Link to="/" className="profile-logout">Déconnexion</Link>
            </div> 
        : null
        }
    </header>
  )
}

export default Header