import axios from 'axios'
import useState from 'react'
let userInfoString = localStorage.getItem('userInfo')
let userInfo = JSON.parse(userInfoString)
// import React from 'react'
// // import { setShowModal, setPost } from './Networking'
// import Thumbs from "./Thumbs"

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
})

const register = (firstName, lastName, profession, email, password) => {
  axios.post('http://localhost:5000/api/auth/signup',
  {   
      firstName: firstName,
      lastName: lastName,
      profession: profession,
      email: email,
      password: password
  })
  .then(res => {
      login(email, password)
  })
  .catch(err => {
      if(err.response.data.error){alert(err.response.data.error)}
      else if(err.response.data[0].message){err.response.data.forEach(error => alert(error.message))}
  })
}

const login = (email, password) => {
  axios.post('http://localhost:5000/api/auth/login',
  {
      email: email,
      password: password
  })
  .then(res => {
    if(res.status === 200) {
      let userInfo = JSON.stringify(res.data)
      localStorage.setItem('userInfo', userInfo)
      window.location = '/posts'
    }})
  .catch(err => alert(err.response.data.error))
}

const getAllMembers = () => {
  setIsLoaded(false)
  axios
  .get('http://localhost:5000/api/auth/user', {
    headers: {
        authorization: userInfo.token
    }})
  .then(membersList => {
    setIsLoaded(true)
    let members = []
    let memberInfo = {}
    membersList.data.forEach(member => {
      memberInfo = {firstName: member.firstName, 
                    lastName: member.lastName,
                    isConnected: member.isConnected,
                    profession: member.profession,
                    image: member.profileImageUrl,
                    _id: member._id,
                  }
      members.push(memberInfo)
      return members
    })
    setMembers(members)
  })
  .catch(error => console.log(error))
  }

  const deleteMember = (member) => {
    axios.delete(`http://localhost:5000/api/auth/user/${member._id}`, {
      headers: {
          authorization: userInfo.token
      }})
      .then(res => console.log(res))
      .catch(err => alert(err))
  }

    const showUser = (member) => {
      if(showUserInfo === member._id) {
        return(
        <div className='modal-member'> 
          <p className='member-name'>{member.firstName} {member.lastName}</p>
          <p className='member-profession'>{member.profession}</p>
          {showUserInfo && user.isAdmin &&  
            <FaWindowClose
                className="modal-close"
                onClick={(e) => {if(window.confirm("Êtes-vous certain de retirer cet utilisateur?")){
                  e.target.closest('.member').remove()
                  deleteMember(member)}
                }}
            />
          }
        </div>
      )}
    }

    const logout = () => {
      axios.post('http://localhost:5000/api/auth/logout',
      {
          email: user.email
      },
      {
          headers: {
              authorization: userInfo.token
        }
      })
      .then(() => {
          window.location = '/'
      })
      .catch(err => console.error(err))
    }
  
    const updateProfile = (image, password, profileSelected) => {
      let formData = new FormData()
      profileSelected && formData.append('image', image)
      password && formData.append('password', password)
      axios.put(`http://localhost:5000/api/auth/user/${user.email}`,
      formData, 
      {
        headers: {
          authorization: userInfo.token
        }
      })
      .then(res => {
          console.log(res)
      })
      .catch(err => console.error(err))
    }

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
          console.log(res)
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

const onEditPost = (post) => {
  const index = posts.findIndex(p => p._id === post._id) //get the index of the post to modify
  if (index !== -1){
      posts[index] = post //modify the post with the new post
      setPosts(posts)
      updatePost(post) //update the db
  }
}

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
  .then((res) => res.data.message)
  .catch(error =>console.log(error))
}

const addPost = () => {
  let formData = new FormData()
  imageSelected && formData.append('image', image, src)
  const completeName = user.firstName + ' ' + user.lastName
  formData.append('user', completeName)
  formData.append('value', input)
  if(input !== "") {
      axios
      .post('http://localhost:5000/api/posts', formData, {
          headers: {
              Authorization: userInfo.token
          }}
          )
          .then(res => {
          postsList.push(res.data.post)
          setPosts(postsList)
          setSrc(src)
      })
      .catch(err => console.log(err))
  } else {
      alert("vous ne pouvez pas envoyer de message vide")
  }
}

export default {
  register,
  login,
  logout,
  addPost,
  getAllUsers,
  getUserAccount,
  getAllMembers,
  showUser,
  updateProfile,
  fetchPosts,
  ShowPosts,
  onEditPost,
  likeFn,
}