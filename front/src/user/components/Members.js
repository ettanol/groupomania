import React, {useState, useEffect} from 'react'
import axios from 'axios'

let userInfoString = localStorage.getItem('userInfo')
let userInfo = JSON.parse(userInfoString)

const Members = () => {
  const [members, setMembers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const toggleMembers = () => {
    console.log("show/hide")
  }

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
                      _id: member._id,
                    }
        members.push(memberInfo)
        return members
      })
      setMembers(members)
    })
    .catch(error => console.log(error))
    }

  return (
    <div className="Members" onClick={toggleMembers}>
      <div className='button-toggler'>
        <div className='button-toggler__bar'></div>
        <div className='button-toggler__bar'></div>
        <div className='button-toggler__bar'></div>
      </div>
        <ul>
            {
            isLoaded ?
            members.map(member => (
                <li className='member' key={member._id}>
                    <p className='member-name'>{member.firstName} {member.lastName}</p>
                    <button className='member-connected' style={{backgroundColor : member.isConnected ? "green" : "red" }}></button>
                </li>
            )) : null
            }
        </ul>
    </div>
  )
}

export default Members