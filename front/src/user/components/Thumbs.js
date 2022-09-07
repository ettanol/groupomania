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
    let likeValue = 0 //the like value depends on where the user clicks  
    if(likeClicked){
        likeValue = 1
    } 
    if(dislikeClicked) {
        likeValue = -1
    }
    axios.post(`http://localhost:5000/api/posts/like/${post._id}`,
    {
        userId: user._id,
        like: likeValue,
    },{
        headers: {
            authorization: userInfo.token
        }
    })
    .then((res) => res.data.message)
    .catch(error =>console.log(error))
}
    

    return (
        <div className="thumbs">
            <FaThumbsUp className="thumbs_up" onClick={() => {
                likeClicked === false ? setLikeClicked(true) : setLikeClicked(false) //if the user havn't yet clicked on the thumbs up button
                likeClicked ? setLike(like -1) : setLike(like + 1) //change the number of likes
                dislikeClicked && setDislike(dislike -1) //if the user clicked on dislike before, change the dislike value
                dislikeClicked && setDislikeClicked(false)
            }} style={{color : likeClicked ? 'green' : '#777'}}/>
            <span>{like}</span>
            <FaThumbsDown className="thumbs_down" onClick={() => {
                dislikeClicked === false ? setDislikeClicked(true) : setDislikeClicked(false) //if the user havn't yet clicked on the thumbs down button
                dislikeClicked ? setDislike(dislike - 1) : setDislike(dislike + 1) //change the number of dislikes
                likeClicked && setLike(like -1) //if the user clicked on like before, change the dislike value
                likeClicked && setLikeClicked(false)
            }} style={{color : dislikeClicked ? 'red' : '#777'}}/>
            <span>{dislike}</span>
        </div>
    )
}

export default Thumbs