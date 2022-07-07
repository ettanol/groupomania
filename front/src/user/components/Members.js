import members from '../assets/members'
import React from 'react'

const Members = () => {
  const toggleMembers = () => {
    console.log("show/hide")
  }
  return (
    <div className="Members" onClick={toggleMembers}>
      <div className='button-toggler'>
        <div className='button-toggler__bar'></div>
        <div className='button-toggler__bar'></div>
        <div className='button-toggler__bar'></div>
      </div>
        <ul>
            {members.map(member => (
                <li className='member' key={member._id}>
                    <p className='member-name'>{member.name}</p>
                    <button className='member-connected' style={{backgroundColor : member.connected ? "green" : "red" }}></button>
                </li>
            ))
            }
        </ul>
    </div>
  )
}

export default Members