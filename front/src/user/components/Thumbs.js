import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { FaThumbsUp,
    FaThumbsDown } from 'react-icons/fa'
import { UserContext } from "../Context/User"

let userInfoString = localStorage.getItem('userInfo')
let userInfo = JSON.parse(userInfoString)

const Thumbs = ({ post, likes, dislikes}) => {
    const { user } = useContext(UserContext)
    const [likeClicked, setLikeClicked] = useState(post.usersLiked.includes(user._id) ? true : false)
    const [dislikeClicked, setDislikeClicked] = useState(post.usersDisliked.includes(user._id) ? true : false)
    const [like, setLike] = useState(likes)
    const [dislike, setDislike] = useState(dislikes)

    useEffect(() => {
      likeFn(post, likeClicked, dislikeClicked)
    }, [likeClicked, dislikeClicked])

    const likeFn = (post, likeClicked, dislikeClicked) => {
    let likeValue = 0
    if(likeClicked){
        likeValue = 1
    } 
    if(dislikeClicked) {
        likeValue = -1
    }
    axios.post(`http://localhost:5000/api/posts/like/${post._id}`,
    {
        userId: userInfo.userId,
        like: likeValue,
    },{
        headers: {
            authorization: userInfo.token
        }
    })
    .then((res) => console.log(res.data))
    .catch(error =>console.log(error))
}
    

    return (
        <div className="thumbs">
            <FaThumbsUp className="thumbs_up" onClick={() => {
                likeClicked === false ? setLikeClicked(true) : setLikeClicked(false)
                likeClicked ? setLike(like -1) : setLike(like + 1)
                dislikeClicked && setDislike(dislike -1)
                dislikeClicked && setDislikeClicked(false)
            }} style={{color : likeClicked ? 'green' : '#777'}}/>
            <span>{like}</span>
            <FaThumbsDown className="thumbs_down" onClick={() => {
                dislikeClicked === false ? setDislikeClicked(true) : setDislikeClicked(false)
                dislikeClicked ? setDislike(dislike - 1) : setDislike(dislike + 1)
                likeClicked && setLike(like -1)
                likeClicked && setLikeClicked(false)
            }} style={{color : dislikeClicked ? 'red' : '#777'}}/>
            <span>{dislike}</span>
        </div>
    )
}

export default Thumbs