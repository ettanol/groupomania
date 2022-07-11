import { useState, useEffect } from "react"
import React from "react"
import axios from "axios"
// import {
//     getUserAccount,
//     getAllPosts,
//     addPost
// } from './Request'

import Modal from "./Modal"
import Thumbs from "./Thumbs"

const Networking = () => {
    const [input, setInput] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [post, setPost] = useState("")

    const [posts, setPosts] = useState(
        [
            {
                _id : 1,
                value: "Bienvenue sur le forum de partage de votre entreprise",
                user : "John Doe",
                imageUrl : "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                likes: 0,
                dislikes: 0,
                usersLiked: [],
                usersDisliked: [],
                timeOfUpload: 1,
            },
        ]
    )

    useEffect(async () => {
        Publications()
    }, [])

    const userInfoString = localStorage.getItem('token')
    const userInfo = JSON.parse(userInfoString)

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const Publications = () => {
        return (
            <div className="publications">
            { axios
            .get('http://localhost:5000/api/posts/',{
            headers: {
                authorization: userInfo[0]
            }})
            .then(posts => {
                console.log(posts.data)
                posts.data.map( post => {
                    return (
                    <div className="publication" key={post._id}>
                    <div className="publication_container">
                        <div className="publication_value">{post.value}</div>
                        <div className="publication_image__container">
                            <div className="publication_image"></div>
                        </div>
                    </div>
                    <div className="user">{post.user}</div>
                    <Thumbs like={post.likes} dislike={post.dislikes}/>
                    <button type="button" className="modify-button"
                    onClick={ () => {setShowModal(true)
                                        setPost(post)} }
                    >Modifier</button>
                    <button type="button" className="delete-button"
                    onClick={(e) => {
                        e.target.closest('.publication').remove()
                    }}>Supprimer</button>
                    </div> 
                    )
                })
            })
            }</div>
        )}

    const addPost = () => {
        if(input !== "") {
            axios
            .post('http://localhost:3000/api/posts', {
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

    const onEditPost = (post) => {
        const index = posts.findIndex(p => p._id === post._id)
        if (index !== -1){
        posts[index] = post
        setPosts(posts)
        }
    }

    const Form = () => {
        return (
            <form className="publish-post"
            onSubmit={(e) => {
                e.preventDefault()
                addPost()
                setInput("")
            }}>
            <textarea type="text" className="publish-text__area" name="post" placeholder="Une idée à partager ?" value={input} maxLength="250" onChange={handleChange}/>
            <label htmlFor="image_button" className="image_button">Ajouter une image</label>
            <input type="file" id="image_button" accept=".png, .jpg, .jpeg, .gif" />
            <button type="submit" 
                className="submitPost">Envoyer</button>
        </form>
        )
    }

    return (
        <div className="networking">
        <Form />
        {showModal && <Modal post={post} setShowModal={setShowModal} onEditPost={onEditPost}/>} 
        <Publications />
    </div>
  )
}

export default Networking