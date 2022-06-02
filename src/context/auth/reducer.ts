

import React from 'react'
import { IUserContext } from '../../interfaces/auth/context'
import IReducer from '../../interfaces/auth/reducer'
import IUser, { DUser } from '../../interfaces/user'


const reducer = ( state: IUserContext,action: IReducer ):IUserContext => {
  
  const USER: IUser = action.PAYLOAD.USER ?? DUser
  const TOKEN: string = action.PAYLOAD.TOKEN ?? ''
  
  

  switch(action.TYPE){
    case 'LOGIN': 
      return {
        USER,
        TOKEN,
        STATUS: true
    }
    case 'LOGOUT': 
      return {
        USER: DUser,
        TOKEN: '',
        STATUS: false
    }
    default:
      return state
  }

}

export default reducer
