import {React, useState, useEffect} from 'react'
import axios from 'axios'

let userInfoString = localStorage.getItem('userInfo')
let userInfo = JSON.parse(userInfoString)

const Members = () => {
  const [members, setMembers] = useState("")
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
    .get('http://localhost:5000/api/auth/user',{
      headers: {
          authorization: userInfo[1]
      }})
    .then(members => {
      setIsLoaded(true)
      setMembers(members.data)
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
                    <button className='member-connected' style={{backgroundColor : member.connected ? "green" : "red" }}></button>
                </li>
            )) : null
            }
        </ul>
    </div>
  )
}

export default Members