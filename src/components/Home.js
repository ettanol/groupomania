import { useState } from 'react'
import logo from '../assets/icon-left-font.png'

import '../styles/Home.css'

import { Link } from "react-router-dom"

const Home = () => {
    const [isSignInOpen, setSignInOpen] = useState(false)
    const [isSignUpOpen, setSignUpOpen] = useState(false)
    const sendRequest = (e) => {
        e.preventDefault()
        console.log("sent")
    }

  return (
    <div className="welcome__page">
        <div className="groupomania-showcase">
            <img src={logo} alt="logo Groupomania" className='groupomania-logo' />
            <div className="groupomania-showcase__image"></div>
        </div>
        <div className="connexion-form">
            <button className="sign-in" 
            style={{backgroundColor: isSignInOpen? 'red' : 'gray'}}
            onClick={() => {setSignInOpen(true)
            setSignUpOpen(false)}
            }> Connexion </button>
            { isSignInOpen ?
                <form className='groupomania-form'>
                    <label for="email"></label>
                    <input type="text" name='email' id='email' placeholder='employee@groupomania.com' className='groupomania-form__input'></input>
                    <label for="password"></label>
                    <input type="text" name='password' id='password' placeholder='mot de passe' className='groupomania-form__input'></input>
                    <Link to="/posts" onClick={()=> sendRequest()} className="submit-button">Envoyer</Link>
                </form>
                : null
            }
            <button className="sign-up" 
            style={{backgroundColor: isSignUpOpen? 'red' : 'gray'}}
            onClick={() => {setSignUpOpen(true)
            setSignInOpen(false)}
            }> Inscription </button>
            { isSignUpOpen ?
                <form className='groupomania-form'>
                    <label for="email"></label>
                    <input type="text" name='email' id='email' placeholder='employee@groupomania.com' className='groupomania-form__input'></input>
                    <label for="password"></label>
                    <input type="text" name='password' id='password' placeholder='mot de passe' className='groupomania-form__input'></input>
                    <button type="submit" onClick={(e)=> {sendRequest(e)}} className="submit-button">Envoyer</button>
                </form>
                : null
            }
        </div>
    </div>
  )
}

export default Home