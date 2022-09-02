import React, { useState} from 'react'
import { FaWindowClose } from 'react-icons/fa'

const Modal = ({ post, setShowModal, onEditPost }) => {
    const [src, setSrc] = useState(post.imageUrl)
    const [modifiedPost, setModifiedPost] = useState(post)
    const [modalSelected, setModalSelected] = useState(false)
    const [isMouseInside, setIsMouseInside] = useState(false)

        return(
        <div className="modal-screen">
            {/* close the modal */}
            <FaWindowClose className = "modal-close" onClick={() => setShowModal(false)}/>
            <div className='modal-content'>
                <div className="modal-modify">
                    {/* change the post state after every letter change */}
                    <textarea className="publication-value" onChange={(e)=> setModifiedPost({...modifiedPost, value: e.target.value})}>{modifiedPost.value}</textarea>
                </div>
                {/* detect whether the mouse is in the div */}
                <div className='modal-publish-image' onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}>
                    {
                        modalSelected || src !== "" ? <img className='publish-image' alt="post" src={src} /> : null //show the image of the post
                    }
                    {
                        isMouseInside && <FaWindowClose className = "modal-close" onClick={() => //adds a close button to delete the image from the post
                            {
                                setModalSelected(false)
                                setSrc("")
                                setModifiedPost({...modifiedPost, imageUrl: ""})
                            }}/>
                    }
                </div>
                <div className="form-buttons">
                        <label htmlFor="modal_image_button" className="image_button">Ajouter une image</label>
                        <input type="file" id="modal_image_button" accept=".png, .jpg, .jpeg, .gif, .webp" 
                            onChange={async e => {
                                let src = ""
                                if(e.target.files.length === 1){ //get the length in case user clicks on image then "cancel"
                                    setModalSelected(true)
                                    src = URL.createObjectURL(e.target.files[0]) //get the file and create an url 
                                    setSrc(src)
                                    setModifiedPost({...modifiedPost, image: e.target.files[0], imageUrl: src})
                                } else {
                                    e.target.value = ""
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