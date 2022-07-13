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
import Form from './Form'

const Networking = () => {
    const [showModal, setShowModal] = useState(false)
    const [post, setPost] = useState("")
    const [posts, setPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    let userInfoString = localStorage.getItem('userInfo')
    let userInfo = JSON.parse(userInfoString)

    useEffect( () => {
        fetchPosts()
    }, [])

    const fetchPosts = () => {
        axios
        .get('http://localhost:5000/api/posts/',{
        headers: {
            Authorization: userInfo[1]
        }})
        .then(posts => {
            setIsLoaded(true)
            setPosts(posts.data)
        })
        .catch(error => console.log(error))
    }
    
    const DisplayPosts = () => {
        const displayPosts = posts.map( post => {
            return (
                <div className="publication" key={post._id}>
                    <div className="publication_container">
                        <div className="publication_value">{post.value}</div>
                        <div className="publication_image__container">
                            <img src={post.imageUrl} className="publication_image" alt="publication"/>
                        </div>
                    </div>
                    <div className="user">{post.user}</div>
                    <Thumbs like={post.likes} dislike={post.dislikes}/>
                    <button type="button" className="modify-button"
                    onClick={ () => {
                        setShowModal(true)
                        setPost(post)
                    }}>Modifier</button>
                    <button type="button" className="delete-button"
                    onClick={(e) => {
                        e.target.closest('.publication').remove()
                    }}>Supprimer</button>
                </div>
            )
        }) 
        return (displayPosts)
    }

    const Publications = () => {
        return (
            <div className="publications">
                {
                    isLoaded ? <DisplayPosts/> 
                    : <div className="loading">Loading...</div>
                }
            </div>
                )}

    const onEditPost = (post) => {
        const index = posts.findIndex(p => p._id === post._id)
        if (index !== -1){
        posts[index] = post
        setPosts(posts)
        }
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