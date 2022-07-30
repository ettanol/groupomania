import React, {useContext, useState} from 'react'
import { UserContext } from "../Context/User"

const Profile = ({logout, updateProfile, modify}) => {
  const { user } = useContext(UserContext)
  const [modifyProfile, setModifyProfile] = useState(modify)
  const [imageModal, setImageModal] = useState(false)
  const [profileSelected, setProfileSelected] = useState(false)
  const [image, setImage] = useState({})
  const [src, setSrc] = useState(user.profileImageUrl)
  const [newPassword, setNewPassword] = useState("")
  return (
      <div className="profile-card">
        {
        modifyProfile ? 
        <form className="profile-modification" onSubmit={() => {
          updateProfile(image, newPassword, profileSelected)
          setModifyProfile(false)
        }}>
          <button type="button" onClick={() => {setModifyProfile(false)}} className="back_button">Retour</button>
          <label htmlFor="profile-image" className="profile-image" style={{backgroundImage: `url(${src})`}}/>
          <input type="file" id="profile-image" accept=".png, .jpg, .jpeg, .gif" onClick={() => setImageModal(true)}
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
          <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
          <p className="profile-profession">{user.profession}</p>
          <button type="button" className="profile-modify" onClick={() => {
            setModifyProfile(true)
          }}>Modifier</button>
          <button type="button" className="profile-logout" onClick={() => {
            logout()
            localStorage.clear()
          }}>Déconnexion</button>
          </>
          }
      </div>
  )
}

export default Profile