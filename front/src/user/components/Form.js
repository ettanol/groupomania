import React, { useState } from "react"
import axios from "axios"


const Form = () => {
    const [input, setInput] = useState("")
    const userInfoString = localStorage.getItem('token')
    const userInfo = JSON.parse(userInfoString)

    const addPost = () => {
        if(input !== "") {
            axios
            .post('http://localhost:5000/api/posts', {
                value: input,
                imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            }, {
                headers: {
                    authorization: userInfo[0]
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
        <textarea type="text" className="publish-text__area" name="post" placeholder="Une idée à partager ?" maxLength="250" onChange={e => setInput(e.target.value)} value={input}/>
        <label htmlFor="image_button" className="image_button">Ajouter une image</label>
        <input type="file" id="image_button" accept=".png, .jpg, .jpeg, .gif" />
        <button type="submit" 
            className="submitPost">Envoyer</button>
    </form>
    )
}

export default Form