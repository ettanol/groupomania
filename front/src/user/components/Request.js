import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
})

const logout = (email, token) => {
  instance.post('/auth/logout',
  {
      email: email
  },
  {
      headers: {
          authorization: token
    }
  })
  .then(() => {
      window.location = '/'
  })
  .catch(err => {if(err){alert(err.response.data.error)}})
}

const updateProfile = (image, password, profileSelected, email, token) => {
  let formData = new FormData()
  profileSelected && formData.append('image', image)
  password && formData.append('password', password)
  instance.put(`/auth/user/${email}`,
  formData, 
  {
    headers: {
      authorization: token
    }
  })
  .then(res => alert(res.data.message))
  .catch(err => {
    if(err.response.data.error){alert(err.response.data.error)}
        else if(err.response.data[0].message){err.response.data.forEach(error => alert(error.message))}
    })
}

export {
  logout,
  updateProfile,
}