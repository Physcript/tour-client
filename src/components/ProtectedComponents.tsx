

import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/auth/context'

interface IProtectedComponent {
  children: React.ReactNode
}


const ProtectedComponent: React.FC<IProtectedComponent> = (props) => {
  const { children } = props
  const { STATUS } = useContext(AuthContext).userState  

  if ( STATUS === false)
    {
      return <Navigate to ='/' />
    }
  return (
    <div>
    { 
      children
    }
    </div>
  )
}


export default ProtectedComponent
