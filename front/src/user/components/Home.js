import { useState } from 'react'
import logo from '../assets/icon-left-font.png'
import React from 'react'
import { Login,
        Register } from './Request'

import '../styles/Home.css'

// const axios = require('axios').default

const Home = () => {
    const [isSignInOpen, setSignInOpen] = useState(false)
    const [isSignUpOpen, setSignUpOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
    <div className="welcome__page">
        <div className="groupomania-showcase">
            <img src={logo} alt="logo Groupomania" className='groupomania-logo' />
            <div className="groupomania-showcase__image"></div>
        </div>
        <div className="connexion-form">
            <button className="sign-in" 
            style={{
                backgroundColor: isSignInOpen? '#FD2D01' : '#FFD7D7',
                color : isSignInOpen ? "#fff" : "#4E5166"
            }}
            onClick={() => {
                setSignInOpen(true)
                setSignUpOpen(false)
            }
            }> Connexion </button>
            { isSignInOpen ?
                <form className='groupomania-form' onSubmit={e => {
                    e.preventDefault()
                    Login(email, password)}}>
                    <label htmlFor="email"></label>
                    <input type="text" name='email' id='email' placeholder='employee@groupomania.com' className='groupomania-form__input'
                    onChange={e => setEmail(e.target.value)} value={email}></input>
                    <label htmlFor="password"></label>
                    <input type="text" name='password' id='password' placeholder='mot de passe' className='groupomania-form__input' onChange={e => setPassword(e.target.value)} value={password}></input>
                    <button type="submit" className="submit-button">Envoyer</button>
                </form>
                : null
            }
            <button className="sign-up" 
            style={{
                backgroundColor: isSignUpOpen? '#FD2D01' : '#FFD7D7',
                color : isSignUpOpen ? "#fff" : "#4E5166"
            }}
            onClick={() => {
                setSignUpOpen(true)
                setSignInOpen(false)
            }
            }> Inscription </button>
            { isSignUpOpen ?
                <form className='groupomania-form' onSubmit={e =>{ 
                e.preventDefault()
                Register(email, password)}}>
                    <label htmlFor="email"></label>
                    <input type="text" name='email' id='email' placeholder='employee@groupomania.com' className='groupomania-form__input'
                    onChange={e => setEmail(e.target.value)}></input>
                    <label htmlFor="password"></label>
                    <input type="text" name='password' id='password' placeholder='mot de passe' className='groupomania-form__input' onChange={e => setPassword(e.target.value)}></input>
                    <button type="submit" className="submit-button" >Envoyer</button>
                </form>
                : null
            }
        </div>
    </div>
  )
}

export default Home