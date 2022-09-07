import React ,{ useState, useEffect, useContext } from "react"
import axios from "axios"

import Modal from "./Modal"
import Thumbs from "./Thumbs"
import Form from './Form'
import { UserContext } from "../Context/User"

const Networking = () => {
    const { user } = useContext(UserContext)
    const [showModal, setShowModal] = useState(false)
    const [post, setPost] = useState("")
    const [posts, setPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [postsListCreated, setPostsListCreated] = useState(false)
    const [error, setError] = useState(false)

    let userInfoString = localStorage.getItem('userInfo')
    let userInfo = JSON.parse(userInfoString) //get userInfo from localstorage

    useEffect( () => {
        fetchPosts() //fetch all posts once the page loads
    }, [])

    useEffect (() => {
        isLoaded && displayPosts(posts) //display all posts only when the posts are loaded from the server
    }, [posts])

    const fetchPosts = () => {
        axios
        .get('http://localhost:5000/api/posts',{
        headers: {
            authorization: userInfo.token //gets the user token
        }})
        .then(posts => {
            setIsLoaded(true)
            posts.data.sort(post => -(post.timeOfUpload)) //sort the posts from last posted to first
            setPosts(posts.data)
        })
        .catch(error => setError(true))
    }

    const getPost = (post) => {
        axios
        .get(`http://localhost:5000/api/posts/${post._id}`,{
            headers: {
                authorization: userInfo.token //used to verify the token
            }})
            .then(res => {
                console.log(res.data) 
            })
            .catch(error => console.log(error))
    }

    const updatePost = (post) => {
        let formData = new FormData()
        formData.append('image', post.image) //formData to send files
        formData.append('value', post.value) //adds infos to be sent for the post
        formData.append('userId', user._id)
        axios
        .put(`http://localhost:5000/api/posts/${post._id}`,
            formData,
            {headers: {
                authorization: userInfo.token
            }})
            .then(res => alert("Post modifié"))
            .catch(error => console.log(error))
    }

    const deletePost = async (post) => { //deletes the posts from the server and from the front page
        const postsLeft = posts.reduce((previousValue, currentValue) => {
            if(currentValue._id !== post._id){
                previousValue.push(currentValue) //if the post isn't the one to be deleted, add the post to the list
            }
            return previousValue
        }, [])
        setPosts(postsLeft)
        axios
        .delete(`http://localhost:5000/api/posts/${post._id}`,
        {
            userId : user._id
        },
        {
            headers: {
                authorization: userInfo.token
            }})
            .then(() => alert("Post supprimé") )
            .catch(error => console.log(error))
    }
        
    const displayPosts = (posts) => {
        setPostsListCreated(false)
        if(isLoaded){  
        const postsList = posts.map( post => { //map the posts to display all infos on the page
            let fullUserName = userInfo.firstName + ' ' + userInfo.lastName 
            return (
                <div className="publication" key={post._id}>
                    <div className="publication_container">
                        <div className="publication_value">{post.value}</div>
                        {post.imageUrl && post.imageUrl !== "" && 
                        <div className="publication_image__container">
                            <img src={post.imageUrl} className="publication_image" alt="publication"/>
                        </div>
                        }
                    </div>
                    <div className="user">{post.user}</div>
                    <Thumbs post={post} likes={post.likes} dislikes={post.dislikes}/>
                    {
                    post.user === fullUserName || user.isAdmin? //only the user who created the post or the admin can access the modify and delete buttons
                        <div className="post-buttons">
                            <button type="button" className="modify-button"
                            onClick={ () => {
                                setShowModal(true)
                                setPost(post)
                                getPost(post)
                            }}>Modifier</button>
                            <button type="button" className="delete-button"
                            onClick={(e) => {
                                if(window.confirm("Êtes-vous certain de retirer cette publication?")){ //asks for confirmation
                                e.target.closest('.publication').remove()
                                deletePost(post)}
                            }}>Supprimer</button>
                        </div>                          
                    : null
                }
                </div>
            )
        })
        setPostsListCreated(true)
        return postsList
    }
}

    const ShowPosts = () => {
        if(postsListCreated){ return (<>{displayPosts(posts)}</>) } //if posts are loaded and everything is okay
        else if(error){return (<div><p>Nous rencontrons des problèmes, veuillez nous en excuser</p></div>)} //if there's an error, show the message
        else {return (<div className="loading">Loading...</div>)} //shows the loading message until posts are loaded
    }

    const Publications = () => {
        return (
            <div className="publications">
                <ShowPosts/>
            </div>
                )
    }

    const onEditPost = (post) => {
        const index = posts.findIndex(p => p._id === post._id) //get the index of the post to modify
        if (index !== -1){
            posts[index] = post //modify the post with the new post
            setPosts(posts)
            updatePost(post) //updates the db
        }
    }

    return (
        <div className="networking">
        <Form postsList={posts} isLoaded={isLoaded} fetchPosts={fetchPosts} displayPosts={displayPosts} ShowPosts={ShowPosts}/>
        {showModal && <Modal post={post} setShowModal={setShowModal} onEditPost={onEditPost}/>} 
        <Publications />
    </div>
  )
}

export default Networking