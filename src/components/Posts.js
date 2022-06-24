import '../styles/Home.css'

import Header from './Header'
import Members from './Members'
import Networking from './Networking'
import Publications from './Publications'

function Posts() {
  return (
    <div className="Posts">
      <Header />
      <Members />
      <Networking />
      <Publications />
    </div>
  )
}

export default Posts