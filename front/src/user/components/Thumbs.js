import React from 'react'
import { useState } from 'react'
import { FaThumbsUp,
    FaThumbsDown } from 'react-icons/fa'

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

export default Thumbs