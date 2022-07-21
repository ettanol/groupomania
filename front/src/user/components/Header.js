import React, {useState, useContext } from "react"
import axios from "axios"

import logo from '../assets/icon-left-font.png'
import { UserContext } from "../Context/User"

const Header = () => {
  const { user } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  const [modify, setModify] = useState(false)
  const [profileSelected, setProfileSelected] = useState(false)
  const [image, setImage] = useState({})
  const [src, setSrc] = useState(user.profileImageUrl)
  const [newPassword, setNewPassword] = useState("")

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

  const updateProfile = () => {
    let formData = new FormData()
    if(profileSelected){
        formData.append('image', image)
    }
    formData.append('password', newPassword)
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
        <img src={logo} className="groupomania-logo" alt="logo de l'entreprise Groupomania"/>
        {!modify && <img className="profile-image" onClick={async () =>{
        setIsOpen(isOpen ? false : true)
    }} alt="profil utilisateur" src={image}/>}
        {
        isOpen ? 
            <div className="profile-card">
              {
              modify ? 
              <form className="profile-modification" onSubmit={() => {
                updateProfile()
                setModify(false)
              }}>
                <button type="button" onClick={() => {setModify(false)}} className="back_button">Retour</button>
                <label htmlFor="profile-image" className="profile-image" style={{backgroundImage: `url(${src})`}}/>
                <input type="file" id="profile-image" accept=".png, .jpg, .jpeg, .gif" 
                    onChange={async e => {
                      if(e.target.files.length === 1){ //get the length in case user clicks on image then "cancel"
                        setProfileSelected(true)
                        setImage(e.target.files[0])
                        setSrc(URL.createObjectURL(e.target.files[0]))
                      } else {
                          setProfileSelected(false)
                          setImage({})
                      }
                }}/>
                <label htmlFor="password">Changez de mot de passe?</label>
                <input type="text" id="password" placeholder="mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                <button type="submit" className="profile-validate">Valider</button>
              </form>
                : 
                <>
                <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
                <p className="profile-profession">{user.profession}</p>
                <button type="button" className="profile-modify" onClick={() => {
                  setModify(true)
                }}>Modifier</button>
                <button type="button" className="profile-logout" onClick={() => {
                  logout()
                  localStorage.clear()
                }}>Déconnexion</button>
                </>
                }
            </div> 
        : null
        }
    </header>
  )
}

export default Header