

import React, { createContext } from 'react'
import { IAuthContext,DUserContext } from '../../interfaces/auth/context'


const AuthContext = createContext<IAuthContext>({
  userState: DUserContext,
  userDispatch: () => {}
})


export default AuthContext
export const AuthContextProvider = AuthContext.Provider
export const AuthContextConsumer = AuthContext.Consumer
