import axios from 'axios'
// import React from 'react'
// // import { setShowModal, setPost } from './Networking'
// import Thumbs from "./Thumbs"

// AXIOS GLOBALS
axios.defaults.headers.authorization = ''

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 2000,
})

// GET REQUEST
const Register = (email, password) => {
    instance.post('/auth/signup',
    {
        email: email,
        password: password
    })
    .then(res => console.log(res))
    .catch(err => console.error(err))
}
  
  // POST REQUEST
  const Login = (email, password) => {
    instance.post('/auth/login',
    {
        email: email,
        password: password
    })
    .then(res => {
      if(res.status === 200) {
        const tokenString = JSON.stringify([res.data.token, res.data.userId])
        localStorage.setItem('userInfo', tokenString)
        console.log(res.data.userId)
        window.location = '/posts'
      }})
    .catch(err => console.error(err))
  }
  
  // PUT/PATCH REQUEST
  const getUserAccount = (userId) => {
    instance
    .get('/auth/user/:userId', {params : {
      userId: userId
    }})
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }
  
  // DELETE REQUEST
  // const getAllPosts = () => {
  //   instance
  //   .get('/posts/')
  //   .then(posts => posts.map( post => {
  //     return (
  //         <div className="publication" key={post._id}>
  //             <div className="publication_container">
  //                 <div className="publication_value">{post.value}</div>
  //                 <div className="publication_image__container">
  //                     <div className="publication_image"></div>
  //                 </div>
  //             </div>
  //             <div className="user">{post.user}</div>
  //             <Thumbs like={post.likes} dislike={post.dislikes}/>
  //             <button type="button" className="modify-button"
  //             onClick={ () => {setShowModal(true)
  //                                 setPost(post)} }
  //             >Modifier</button>
  //             <button type="button" className="delete-button"
  //             onClick={(e) => {
  //                 e.target.closest('.publication').remove()
  //             }}>Supprimer</button>
  //         </div>
  // )}
  // ))
  //   .catch(err => console.error(err))
  // }
  
  // SIMULTANEOUS DATA
  const addPost = () => {
    instance.post('/posts/')
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }


export { Login, 
        Register, 
        getUserAccount,
        // getAllPosts, 
        addPost }