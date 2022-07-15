import { useState } from 'react'
import logo from '../assets/icon-left-font.png'
import React from 'react'
import axios from 'axios'
// import  login from './Request'
// import register from './Request'

import '../styles/Home.css'

// const axios = require('axios').default

const Home = () => {
    const [isSignInOpen, setSignInOpen] = useState(false)
    const [isSignUpOpen, setSignUpOpen] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profession, setProfession] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = (email, password) => {
        axios.post('http://localhost:5000/api/auth/login',
        {
            email: email,
            password: password
        })
        .then(res => {
          if(res.status === 200) {
            let userInfo = JSON.stringify([res.data.email, res.data.token])
            localStorage.setItem('userInfo', userInfo)
            window.location = '/posts'
          }})
        .catch(err => console.error(err))
      }

    const register = (firstName, lastName, profession,  email, password) => {
    axios.post('http://localhost:5000/api/auth/signup',
    {   
        firstName: firstName,
        lastName: lastName,
        profession: profession,
        email: email,
        password: password
    })
    .then(res => console.log(res))
    .catch(err => console.error(err))
    }

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
            <form className='groupomania-form' onSubmit={e =>{ 
                e.preventDefault()
                login(email, password)}}>
                    <label htmlFor="email"></label>
                    <input type="text" name='email' id='email' placeholder='prénom.nom@groupomania.fr' className='groupomania-form__input'
                    onChange={e => setEmail(e.target.value)}></input>
                    <label htmlFor="password"></label>
                    <input type="password" name='password' id='password' placeholder='mot de passe' className='groupomania-form__input' onChange={e => setPassword(e.target.value)}></input>
                    <button type="submit" className="submit-button" >Envoyer</button>
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
            <form className='groupomania-form' onSubmit={e => {
                e.preventDefault()
                setEmail(`${firstName}.${lastName}@groupomania.fr`)
                register(firstName, lastName, profession, email, password)
                login(email, password)}}>
                <label htmlFor="firstName"></label>
                <input type="text" name='firstName' id='firstName' placeholder='prénom' className='groupomania-form__input'
                onChange={e => setFirstName(e.target.value)} value={firstName}></input>
                <label htmlFor="lastName"></label>
                <input type="text" name='lastName' id='lastName' placeholder='nom' className='groupomania-form__input'
                onChange={e => setLastName(e.target.value)} value={lastName}></input>
                <input type="text" name='profession' id='profession' placeholder='profession' className='groupomania-form__input'
                onChange={e => setProfession(e.target.value)} value={profession}></input>
                <label htmlFor="password"></label>
                <input type="password" name='password' id='password' placeholder='mot de passe' className='groupomania-form__input' onChange={e => setPassword(e.target.value)} value={password}></input>
                <button type="submit" className="submit-button">Envoyer</button>
            </form>
                : null
            }
        </div>
    </div>
  )
}

export default Home