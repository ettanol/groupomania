import React, { useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'

const Modal = ({ post, setShowModal, onEditPost }) => {
    const [src, setSrc] = useState(post.imageUrl)
    const [modifiedPost, setModifiedPost] = useState(post)
    const [modalSelected, setModalSelected] = useState(false)
    const [isMouseInside, setIsMouseInside] = useState(false)

        return(
        <div className="modal-screen">
            <FaWindowClose className = "modal-close" onClick={() => setShowModal(false)}/>
            <div className='modal-content'>
                <div className="modal-modify">
                    <textarea className="publication-value" onChange={(e)=> setModifiedPost({...modifiedPost, value: e.target.value})}>{modifiedPost.value}</textarea>
                </div>
                <div className='modal-publish-image'>
                    {
                        modalSelected ? <img className='publish-image' alt="post" src={src} onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}/>
                        : <img className="publish-image" alt="remplacement" src={src} onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}/>
                    }
                    {
                        isMouseInside && <FaWindowClose className = "modal-close" onClick={() => 
                            {
                                setModalSelected(false)
                                setSrc("")
                            }}/>
                    }
                </div>
                <div className="form-buttons">
                        <label htmlFor="modal_image_button" className="image_button">Ajouter une image</label>
                        <input type="file" id="modal_image_button" accept=".png, .jpg, .jpeg, .gif" 
                            onChange={async e => {
                                if(e.target.files.length === 1){ //get the length in case user clicks on image then "cancel"
                                    setModalSelected(true)
                                    setSrc(URL.createObjectURL(e.target.files[0]))
                                    setModifiedPost({...modifiedPost, image: e.target.files[0]})
                                } else {
                                    setModalSelected(false)
                                    setSrc("")
                                }
                            }}
                        />
                        <button type="button" className="modify-button"
                        onClick={() => {
                            setShowModal(false)
                            onEditPost(modifiedPost)
                        }
                        }>Modifier</button>
                    </div>
                </div>
        </div>)
}

export default Modal