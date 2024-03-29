import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { FaWindowClose } from 'react-icons/fa'
import { UserContext } from "../Context/User"

const Form = ({ postsList, fetchPosts, displayPosts, ShowPosts  }) => {
    const { user } = useContext(UserContext)

    const [input, setInput] = useState("")
    const [image, setImage] = useState({})
    const [src, setSrc] = useState("")
    const [posts, setPosts] = useState(postsList)
    
    const [imageSelected, setImageSelected] = useState(false)
    const [isMouseInside, setIsMouseInside] = useState(false)
    
    let userInfoString = localStorage.getItem('userInfo')
    let userInfo = JSON.parse(userInfoString)

    useEffect(() => {
        fetchPosts()
        displayPosts(posts)
        ShowPosts()
    }, [posts])
    
    
    const addPost = () => {
        let formData = new FormData()
        imageSelected && formData.append('image', image, src) //adds the image if selected
        const completeName = userInfo.firstName + ' ' + userInfo.lastName
        formData.append('user', completeName)
        formData.append('userId', user._id)
        formData.append('value', input)
        if(input !== "") {
            axios
            .post('http://localhost:5000/api/posts', formData, {
                headers: {
                    Authorization: userInfo.token
                }}
                )
                .then(res => {
                postsList.push(res.data.post) //add the post to the post list
                setPosts(postsList)
                setSrc(src)
            })
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
            setImageSelected(false)
        }}>
        <div className="form-input">
            <textarea type="text" className="publish-text__area" name="post" placeholder="Une idée à partager ?" maxLength="250" onChange={e => {
                setInput(e.target.value)
                }} value={input}/>
                {imageSelected ? ( //if an image is selected, show the image, else show a space for the potential image
                    <div
                        onMouseEnter={() => setIsMouseInside(true)}
                        onMouseLeave={() => setIsMouseInside(false)}
                    >
                        <img
                            className="publish-image"
                            alt="votre sélection"
                            src={src}
                        />
                        {isMouseInside && (
                            <FaWindowClose
                                className="modal-close"
                                onClick={() => {
                                    setImageSelected(false)
                                    setSrc("")
                                    setImage({})
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <div className="image_replacement" alt="remplacement"></div>
                )}
        </div>
        <div className="form-buttons">
            <label htmlFor="image_button" className="image_button">Ajouter une image</label>
            <input type="file" id="image_button" accept=".png, .jpg, .jpeg, .gif, .webp" 
                onChange={async e => {
                    if(e.target.files.length === 1){ //get the length in case user clicks on image then "cancel"
                        setImageSelected(true)
                        setImage(e.target.files[0])
                        setSrc(URL.createObjectURL(e.target.files[0]))
                    } else {
                        setImageSelected(false)
                        setSrc("")
                        setImage({})
                    }
                }}/>
            <button type="submit" 
                className="submitPost">Envoyer</button>
        </div>
    </form>
    )
}

export default Form