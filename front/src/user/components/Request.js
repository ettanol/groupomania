import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
})

const register = (firstName, lastName, profession, email, password) => {
  instance.post('/auth/signup',
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
  instance.post('/auth/login',
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
  .catch(alert("vous n'avez pas pu être déconnecté"))
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
  .then(alert ("Profil modifié"))
  .catch(err => {
    if(err.response.data.error){alert(err.response.data.error)}
        else if(err.response.data[0].message){err.response.data.forEach(error => alert(error.message))}
    })
}

export {
  register,
  login,
  logout,
  updateProfile,
}