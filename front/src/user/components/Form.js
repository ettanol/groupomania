import React, { useState } from "react"
import axios from "axios"
import { FaWindowClose } from 'react-icons/fa'

const Form = () => {
    const [input, setInput] = useState("")
    const [user, setUser] = useState("")
    const [image, setImage] = useState({})

    const [selected, setSelected] = useState(false)
    const [isMouseInside, setIsMouseInside] = useState(false)

    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)

    const addPost = () => {
        if(input !== "") {
            setUser(`${userInfo.firstName} ${userInfo.lastName}`)
            axios
            .post('http://localhost:5000/api/posts', {
                user: user,
                value: input,

            }, {
                headers: {
                    Authorization: userInfo.token
                }}
            )
            .then(res => console.log(res))
            .catch(err => console.log(err))
        } else {
            alert("vous ne pouvez pas envoyer de message vide")
        }
    }

    return (
        <form className="publish-post"
        onSubmit={(e) => {
            e.preventDefault()
            addPost()
            setInput("")
        }}>
        <div className="form-input">
            <textarea type="text" className="publish-text__area" name="post" placeholder="Une idée à partager ?" maxLength="250" onChange={e => {
                setInput(e.target.value)
                }} value={input}/>
            {
                selected ? <img className='publish-image' alt="votre image" src={image} onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}/> : <div className="image_replacement" alt="remplacement"></div> 
            }
            {
                isMouseInside && <FaWindowClose className = "modal-close" onClick={() => 
                    {
                        setSelected(false)
                        setImage({})
                    }}/>
            }
        </div>
        <label htmlFor="image_button" className="image_button">Ajouter une image</label>
        <input type="file" id="image_button" accept=".png, .jpg, .jpeg, .gif" 
            onChange={e => {
                if(e.target.files){
                    setSelected(true)
                    setImage(URL.createObjectURL(e.target.files[0]))
                }
            }}/>
        <button type="submit" 
            className="submitPost">Envoyer</button>
    </form>
    )
}

export default Form