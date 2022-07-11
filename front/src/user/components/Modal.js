import React, { useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'

const Modal = ({ post, setShowModal, onEditPost }) => {
    const [modifiedPost, setModifiedPost] = useState(post)
        return(
        <div className="modal-screen">
            <FaWindowClose className = "modal-close" onClick={() => setShowModal(false)}/>
            <div className="modal-modify">
                <textarea className="publication-value" onChange={(e)=> setModifiedPost({...modifiedPost, value: e.target.value})}>{modifiedPost.value}</textarea>
                <button type="button" className="modify-button"
                onClick={() => {
                    setShowModal(false)
                    onEditPost(modifiedPost)
                }
                }>Modifier</button>
            </div>
        </div>)
}

export default Modal