import { useState } from "react"
import { FaWindowClose,
            FaThumbsUp,
            FaThumbsDown } from 'react-icons/fa'

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
                likes: 2,
                dislikes: 0,
                usersLiked: ["John Doe", "Colonel Moutarde"],
                usersDisliked: [],
                timeOfUpload: 1,
            },
            {
                _id : 2,
                value: "Wow, super cool de pouvoir discuter avec vous",
                user : "Colonel Moutarde",
                likes: 2,
                dislikes: 0,
                usersLiked: ["John Doe", "Colonel Moutarde"],
                usersDisliked: [],
                timeOfUpload: 2,
            },
        ]
    )

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const addPost = (post) => {
        if(input !== "" || input !== " ") {
            post = {
                _id : posts.length + 1,
                value: input,
                user: "John Doe",
                likes: 0,
                dislikes: 0,
                usersLiked: [],
                usersDisliked: [],
                timeOfUpload: new Date(),
            }
            setPosts([...posts, post])
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
        {showModal && <Modal post={post} setShowModal={setShowModal} onEditPost={onEditPost}/>} 
        <div className="publications">
            {
                posts.map( post => {
                    return (
                        <div className="publication" key={post._id}>
                        <div className="publication-value">{post.value}</div>
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
    </div>
  )
}

export default Networking