import members from '../assets/members'

const Members = () => {
  return (
    <div className="Members">
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