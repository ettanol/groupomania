import { useState } from "react"
import React from "react"
import { FaWindowClose,
            FaThumbsUp,
            FaThumbsDown } from 'react-icons/fa'
import axios from "axios"

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

const Thumbs = (props) => {
    const [likeClicked, setLikeClicked] = useState(false)
    const [dislikeClicked, setDislikeClicked] = useState(false)
    const [like, setLike] = useState(props.like)
    const [dislike, setDislike] = useState(props.dislike)

    return (
        <div className="thumbs">
            <FaThumbsUp className="thumbs_up" onClick={() => {
                likeClicked === false ? setLikeClicked(true) : setLikeClicked(false)
                if(dislikeClicked){
                    setDislikeClicked(false)
                    setDislike(dislike + 1)
                }  
                likeClicked ? setLike(like - 1) : setLike(like + 1)
            }} style={{color : likeClicked ? 'green' : '#777'}}/>
            <span>{like}</span>
            <FaThumbsDown className="thumbs_down" onClick={() => {
                dislikeClicked === false ? setDislikeClicked(true) : setDislikeClicked(false)
                if(likeClicked){
                    setLikeClicked(false)
                    setLike(like - 1)
                }  
                dislikeClicked ? setDislike(dislike + 1) : setDislike(dislike - 1)
            }} style={{color : dislikeClicked ? 'red' : '#777'}}/>
            <span>{dislike}</span>
        </div>
    )
}

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

    const handleChange = (e) => {
        setInput(e.target.value)
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

    const Publications = () => {
        return (
            <div className="publications">
            {
                posts.map( post => {
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
                )}
                ).sort(post => -(post.timeOfUpload))
            }
        </div>
        )
    }

    const addPost = (post) => {
        if(input !== "") {
            axios
            .post('http://localhost:3000/api/posts', {
                value: input,
                user: "John Doe",
                imageUrl: "",
                likes: 0,
                dislikes: 0,
                usersLiked: [],
                usersDisliked: [],
                timeOfUpload: new Date(),
            })
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
  return (
    <div className="networking">
        <Form />
        {showModal && <Modal post={post} setShowModal={setShowModal} onEditPost={onEditPost}/>} 
        <Publications />
    </div>
  )
}

export default Networking