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
    let userInfo = JSON.parse(userInfoString)

    useEffect( () => {
        fetchPosts()
        displayPosts(posts)
    }, [])

    useEffect (() => {
        displayPosts(posts)
    }, [posts])

    const fetchPosts = () => {
        axios
        .get('http://localhost:5000/api/posts',{
        headers: {
            authorization: userInfo.token
        }})
        .then(posts => {
            setIsLoaded(true)
            posts.data.sort(post => -(post.timeOfUpload))
            setPosts(posts.data)
        })
        .catch(error => setError(true))
    }

    const getPost = (post) => {
        axios
        .get(`http://localhost:5000/api/posts/${post._id}`,{
            headers: {
                authorization: userInfo.token
            }})
            .then(res => {
                console.log(res.data)
            })
            .catch(error => console.log(error))
    }

    const updatePost = (post) => {
        let formData = new FormData()
        if(post.image){ formData.append('image', post.image)}
        formData.append('value', post.value)
        axios
        .put(`http://localhost:5000/api/posts/${post._id}`,
            formData,
            {headers: {
                authorization: userInfo.token
            }})
            .then(post => console.log(post))
            .catch(error => console.log(error))
    }

    const deletePost = async (post) => {
        const postsLeft = posts.reduce((previousValue, currentValue) => {
            if(currentValue._id !== post._id){
                previousValue.push(currentValue)
            }
            return previousValue
        }, [])
        setPosts(postsLeft)
        axios
        .delete(`http://localhost:5000/api/posts/${post._id}`, {
            headers: {
                authorization: userInfo.token
            }})
            .then(() => alert("post supprimé") )
            .catch(error => console.log(error))
    }
        
    const displayPosts = (posts) => {
        setPostsListCreated(false)
        setPosts(posts)
        if(isLoaded){  
        const postsList = posts.map( post => {
            let fullUserName = user.firstName + ' ' + user.lastName 
            return (
                <div className="publication" key={post._id}>
                    <div className="publication_container">
                        <div className="publication_value">{post.value}</div>
                        <div className="publication_image__container">
                            <img src={post.imageUrl} className="publication_image" alt="publication"/>
                        </div>
                    </div>
                    <div className="user">{post.user}</div>
                    <Thumbs post={post} likes={post.likes} dislikes={post.dislikes}/>
                    {
                    post.user === fullUserName || user.isAdmin? 
                        <div className="post-buttons">
                            <button type="button" className="modify-button"
                            onClick={ () => {
                                setShowModal(true)
                                setPost(post)
                                getPost(post)
                            }}>Modifier</button>
                            <button type="button" className="delete-button"
                            onClick={(e) => {
                                if(window.confirm("Êtes-vous certain de retirer cette publication?")){
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
        if(postsListCreated){ return (<>{displayPosts(posts)}</>) }
        else if(error){return (<div><p>Nous rencontrons des problèmes, veuillez nous en excuser</p></div>)}
        else {return (<div className="loading">Loading...</div>)}
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
            updatePost(post) //update the db
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