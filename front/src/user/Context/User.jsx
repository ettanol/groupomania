import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

// initial state
const initialState = ""

// create context
export const UserContext = createContext(initialState)

// provider component
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialState)
    const [isLoaded, setIsLoaded] = useState(false)

    let userInfoString = localStorage.getItem('userInfo')
    let userInfo = JSON.parse(userInfoString)

    useEffect(() => {
      getUserAccount(userInfo.email)
    }, [])

    const getUserAccount = (email) => {
        axios
          .get(`http://localhost:5000/api/auth/user/${email}`,{
            headers: {
                authorization: userInfo.token
            }
          })
          .then(user => {
              setIsLoaded(true)
              setUser(user.data)
          })
          .catch(error => console.log(error))
    }

    if(isLoaded){
        return (
            <UserContext.Provider value={{user}}>
                {children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider