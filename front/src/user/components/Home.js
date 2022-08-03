import React, {useState, useEffect } from 'react'
import logo from '../assets/icon-left-font.png'
import axios from 'axios'

import '../styles/Home.css'

const Home = () => {
    const [isSignInOpen, setSignInOpen] = useState(false)
    const [isSignUpOpen, setSignUpOpen] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profession, setProfession] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        setEmail(`${firstName}.${lastName}@groupomania.fr`)
    }, [lastName])
    

    const login = (email, password) => {
        axios.post('http://localhost:5000/api/auth/login',
        {
            email: email,
            password: password
        })
        .then(res => {
          if(res.status === 200) {
            let userInfo = JSON.stringify(res.data)
            localStorage.setItem('userInfo', userInfo)
            window.location = '/posts'
          }})
        .catch(err => alert(err.response.data.error))
      }

    const register = ()  => {
    axios.post('http://localhost:5000/api/auth/signup',
    {   
        firstName: firstName,
        lastName: lastName,
        profession: profession,
        email: email,
        password: password
    })
    .then(res => {
        login(email, password)
    })
    .catch(err => {
        if(err.response.data.error){alert(err.response.data.error)}
        else if(err.response.data[0].message){err.response.data.forEach(error => alert(error.message))}
    })
    }

  return (
    <div className="welcome__page">
        <div className="groupomania-showcase">
            <img src={logo} alt="logo Groupomania" className='groupomania-logo' />
            <div className="groupomania-showcase__image"></div>
        </div>
        <div className="connexion-form">
            <div className='sign-in-form'>
                { isSignInOpen ?
                <form className='groupomania-form' onSubmit={e =>{ 
                    e.preventDefault()
                    login(email, password)}}>
                        <label htmlFor="email"></label>
                        <input type="text" name='email' id='email' placeholder='prénom.nom@groupomania.fr' className='groupomania-form__input'
                        onChange={e => setEmail(e.target.value)} required pattern="[-\p{L}0-9#!%$‘&+*–/=?^_`.{|}~]+@{1}[a-z]{1,15}\.{1}[a-z]{2,5}(\.[a-z]{2,5})?" title='Veuillez écrire une adresse mail correcte'></input>
                        <label htmlFor="password"></label>
                        <input type="password" name='password' id='password' placeholder='mot de passe' className='groupomania-form__input' onChange={e => setPassword(e.target.value)} required></input>
                        <button type="submit" className="submit-button">Envoyer</button>
                    </form>
                    
                    : 
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
                }
            </div>
            <div className='sign-in-form'>
                { isSignUpOpen ?
                <form className='groupomania-form' onSubmit={e => {
                    e.preventDefault()
                    register()
                }}>
                    <label htmlFor="firstName"></label>
                    <input type="text" name='firstName' id='firstName' placeholder='prénom' className='groupomania-form__input'
                    onChange={e => {
                        if(e.target.value !== ""){
                            let firstName = e.target.value[0].toUpperCase() + e.target.value.slice(1,)
                            setFirstName(firstName)
                        } else {
                            setFirstName("")
                        }
                    }} value={firstName} required pattern="^([\p{L}]{1,20}( |-|'|\.)? ?){1,4}" title='Veuillez vérifier cette information'></input>
                    <label htmlFor="lastName"></label>
                    <input type="text" name='lastName' id='lastName' placeholder='nom' className='groupomania-form__input'
                    onChange={e => {
                        if(e.target.value !== ""){
                            let lastName = e.target.value[0].toUpperCase() + e.target.value.slice(1,)
                            setLastName(lastName)
                        } else {
                            setLastName("")
                        }
                            
                            }} value={lastName} required pattern="^([\p{L}]{1,20}( |-|'|\.)? ?){1,4}" title='Veuillez vérifier cette information'></input>
                    <input type="text" name='profession' id='profession' placeholder='profession' className='groupomania-form__input'
                    onChange={e => setProfession(e.target.value)} value={profession} required pattern="^([\p{L}]{1,20}( |-|'|\.)? ?){1,4}" title='Veuillez vérifier cette information'></input>
                    <label htmlFor="password"></label>
                    <input type="password" name='password' id='password' placeholder='mot de passe' className='groupomania-form__input' onChange={e => setPassword(e.target.value)} value={password} required></input>
                    <button type="submit" className="submit-button">Envoyer</button>
                </form>
                    :                 
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
                }
            </div>
        </div>
    </div>
  )
}

export default Home