import React from 'react'

function Profile({image, src}) {
  return (
    <div className='modal-screen'>
        <div className='modal-modify'>
            <div className='cropping-tool'>
              <div className='cropping-circle'></div>
              <img src={src} alt="selection" className='modal-selection'/>
            </div>
        </div>
    </div>
  )
}

export default Profile