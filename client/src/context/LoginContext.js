import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const LoginContext = React.createContext()
export const LoginProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [video,setVideo] = useState({})
    const [cliked, setCliked] = useState(false);
    useEffect(()=>{
      const userId = window.sessionStorage.getItem("current_userId")
      if(userId){
        const findUser = async () => {
          const res = await axios.get(`/users/find/${userId}`);
          setCurrentUser(res.data);
        };
        findUser()
      }
      
    },[cliked])

  return (
    <LoginContext.Provider
      value={{
        currentUser, setCurrentUser,video,setVideo,cliked, setCliked
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}
