import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { FaWindowClose } from 'react-icons/fa'
import { UserContext } from "../Context/User"
import Profile from "./Profile"

let userInfoString = localStorage.getItem('userInfo')
let userInfo = JSON.parse(userInfoString)

const Members = () => {
  const { user } = useContext(UserContext)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [member, setMember] = useState([])
  const [members, setMembers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState("")
  const [showMembers, setShowMembers] = useState(false)

  useEffect(() => {
    getAllMembers()
  }, [])  

  const getAllMembers = () => {
    setIsLoaded(false)
    axios
    .get('http://localhost:5000/api/auth/user', {
      headers: {
          authorization: userInfo.token
      }})
    .then(membersList => {
      setIsLoaded(true)
      let members = []
      let memberInfo = {}
      membersList.data.forEach(member => {
        memberInfo = {firstName: member.firstName, 
                      lastName: member.lastName,
                      isConnected: member.isConnected,
                      profession: member.profession,
                      image: member.profileImageUrl,
                      _id: member._id,
                    }
        members.push(memberInfo)
        return members
      })
      setMembers(members)
    })
    .catch(error => console.log(error))
    }

    const deleteMember = (member) => {
      axios.delete(`http://localhost:5000/api/auth/user/${member._id}`, {
        headers: {
            authorization: userInfo.token
        }})
        .then(res => alert(res))
        .catch(err => alert(err))
    }

      const showUser = (member) => {
        if(showUserInfo === member._id) {
          return(
          <div className='modal-member'> 
            <p className='member-name'>{member.firstName} {member.lastName}</p>
            <p className='member-profession'>{member.profession}</p>
            {showUserInfo && user.isAdmin &&  
              <FaWindowClose
                  className="modal-close"
                  onClick={(e) => {if(window.confirm("Êtes-vous certain de retirer cet utilisateur?")){
                    e.target.closest('.member').remove()
                    deleteMember(member)}
                  }}
              />
            }
          </div>
        )}
      }

    return (
      <>
        <div className='button-toggler' onClick={() => {if(showMembers){setShowMembers(false)} else {setShowMembers(true)}}}>
          <div className='button-toggler__bar'></div>
          <div className='button-toggler__bar'></div>
          <div className='button-toggler__bar'></div>
        </div>
        <div className="Members" style={!window.matchMedia("(max-width: 465px)").matches || showMembers? {
          transform: "translateX(0%)", visibility:"visible"} : {transform: "translateX(-100%)",
      visibility: "hidden"}}>
        {showMembers && <img className="profile-image" onClick={() =>{
        setIsProfileOpen(isProfileOpen ? false : true)
      }} alt="profil utilisateur" src={user.profileImageUrl}/>}
      {isProfileOpen && showMembers && <Profile />}
          <ul>
              {members.map(member => member._id !== user._id && (
                  <li className='member' key={member._id} onMouseEnter={() => {
                    setMember(member)
                    setShowUserInfo(member._id)
                  }} onMouseLeave={() => {setShowUserInfo("")}}>
                    {showUserInfo !== "" && showUser(member)}
                    <p className='member-name'>{member.firstName} {member.lastName}</p>
                    <div className='member-profile'>
                      <img className='member-profile-image' alt='profile' src={member.image}/>
                      <div className='member-connected' style={{backgroundColor : member.isConnected ? "green" : "red" }}></div>
                    </div>
                  </li>
              ))
            }
          </ul>
      </div>
    </>
    )
  }

export default Members