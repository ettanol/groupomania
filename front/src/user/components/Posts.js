import '../styles/Home.css'
import React  from 'react'

import Header from './Header'
import Members from './Members'
import Networking from './Networking'
// import Publications from './Publications'

const Posts = () => {
  return (
      <div className="Posts">
        <Header />
        <Members />
        <Networking />
        {/* <Publications /> */}
      </div> 
  )
}

export default Posts