import React from 'react'
import { Navigate } from "react-router-dom"
import { useUserAuth } from "./Context/UserAuthContext"

function ProtectedRoute({children}) {
    let {user} = useUserAuth();
  
    if(!user)
    {
        return <Navigate to="/frontpage"/>
    }
    

  return children
}

export default ProtectedRoute