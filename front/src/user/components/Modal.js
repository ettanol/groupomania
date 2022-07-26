import React, { useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'

const Modal = ({ post, setShowModal, onEditPost }) => {
    const [image, setImage] = useState({})
    const [src, setSrc] = useState("")
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
                    {
                        modalSelected ? <img className='modal-publish-image' alt="post" src={src} onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}/>
                        
                        : <div className="image_replacement" alt="remplacement"></div> 
                    }
                    {
                        isMouseInside && <FaWindowClose className = "modal-close" onClick={() => 
                            {
                                setModalSelected(false)
                                setImage({})
                            }}/>
                    }
                <div className="form-buttons">
                        <label htmlFor="modal_image_button" className="image_button">Ajouter une image</label>
                        <input type="file" id="modal_image_button" accept=".png, .jpg, .jpeg, .gif" 
                            onChange={async e => {
                                if(e.target.files.length === 1){ //get the length in case user clicks on image then "cancel"
                                    setModalSelected(true)
                                    setImage(e.target.files[0])
                                    setSrc(URL.createObjectURL(e.target.files[0]))
                                    setModifiedPost({...modifiedPost, image: e.target.files[0]})
                                } else {
                                    setModalSelected(false)
                                    setImage({})
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