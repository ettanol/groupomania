import React, {useContext, useState} from 'react'
import { UserContext } from "../Context/User"
import {logout, updateProfile} from './Request'
import { FaPencilAlt } from 'react-icons/fa'

const Profile = () => {
  const { user } = useContext(UserContext)
  const [modifyProfile, setModifyProfile] = useState(false)
  const [profileSelected, setProfileSelected] = useState(false)
  const [image, setImage] = useState({})
  const [src, setSrc] = useState(user.profileImageUrl)
  const [newPassword, setNewPassword] = useState("")

  let userInfoString = localStorage.getItem('userInfo')
  let userInfo = JSON.parse(userInfoString)

  let email = userInfo.email
  let token = userInfo.token
  return (
      <div className="profile-card">
        {
        modifyProfile ? //put up the form to modify infos
        <form className="profile-modification" onSubmit={() => {
          updateProfile(image, newPassword, profileSelected, email, token)
          setModifyProfile(false)
        }}>
          <button type="button" onClick={() => {
            setModifyProfile(false)
            setSrc(user.profileImageUrl)
            setNewPassword("")
            }} className="back_button">Retour</button>
          <label htmlFor="profile-image" className="profile-image">
            <img class="profile-image" alt="profil utilisateur" src={src}/>
            <FaPencilAlt className="indicator" style={{color: "red"}}/>
          </label>
          <input type="file" id="profile-image" accept=".png, .jpg, .jpeg"
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
          <label htmlFor="password" className='password'>Changez de mot de passe?</label>
          <input type="text" id="password" placeholder="mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
          <button type="submit" className="profile-validate">Valider</button>
        </form>
          : 
          <>
          <h1 className="profile-name">{userInfo.firstName} {userInfo.lastName}</h1>
          <p className="profile-profession">{userInfo.profession}</p>
          <button type="button" className="profile-modify" onClick={() => {
            setModifyProfile(true)
          }}>Modifier</button>
          <button type="button" className="profile-logout" onClick={() => {
            logout(email, token)
            localStorage.clear()
          }}>Déconnexion</button>
          </>
          }
      </div>
  )
}

export default Profile