

import IUser from '../user'

export default interface IReducer {
  TYPE: 'LOGIN' | 'LOGOUT' | 'AUTH',
  PAYLOAD: {
    USER?: IUser,
    TOKEN?: string
  }
}
