import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { FaWindowClose } from 'react-icons/fa'
import { UserContext } from "../Context/User"

let userInfoString = localStorage.getItem('userInfo')
let userInfo = JSON.parse(userInfoString)

const Members = () => {
  const { user } = useContext(UserContext)
  const [members, setMembers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)

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

  if(isLoaded){
      const showUser = (member) => {
        if(showUserInfo) {
          return(
          <div className='modal-member'> 
            <p className='member-name'>{member.firstName} {member.lastName}</p>
            {/* <p className='member-profession'>{member.profession}</p> */}
          </div>
        )}
        if(showUserInfo && user.email === "admin@groupomania.fr"){
          return (
          <FaWindowClose
              className="modal-close"
              onClick={() => {
                console.log("delete")
              }}
          />
        )}
      }

    return (
    <div className="Members">
      <div className='button-toggler'>
        <div className='button-toggler__bar'></div>
        <div className='button-toggler__bar'></div>
        <div className='button-toggler__bar'></div>
      </div>
        <ul>
            {members.map(member => (
                <li className='member' key={member._id} onMouseEnter={() => {
                  console.log(member)
                  setShowUserInfo(true)
                  showUser(member)
                }} onMouseLeave={() => {setShowUserInfo(false)}}>
                  <p className='member-name'>{member.firstName} {member.lastName}</p>
                  <img className='profile-image' alt='profile' src={member.image}/>
                  <button className='member-connected' style={{backgroundColor : member.isConnected ? "green" : "red" }}></button>
                </li>
            ))
          }
        </ul>
    </div>
    )
  }
}

export default Members