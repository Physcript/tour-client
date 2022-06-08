
import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import AuthContext from '../context/auth/context'
export interface IHeaderComp 
{

}
const HeaderComp: React.FC<IHeaderComp> = ( props ) => {
  const userContext = useContext(AuthContext)
  const navigate = useNavigate()

  const logoutHandler = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault()
    userContext.userDispatch({ TYPE: 'LOGOUT', PAYLOAD: {}})
    navigate('/')
  }

  return (
    <div className='d-flex d-space-between container headerComp' style = {{ height: '10vh' }}>
      <section>
        <label onClick = { () => { navigate('/test') } } >Logo</label>
      </section>
      {
        userContext.userState.STATUS ? (
          <section className = 'd-flex gap-1'>
            <label>{ userContext.userState.USER.lastName }</label>
            <label onClick = { logoutHandler } >Logout</label>
          </section>
        ) : 
      (  
        <section className='d-flex gap-2'>
          <label onClick = { () => { navigate('/login') }}>Login</label>
          <label onClick = { () => { navigate('/register') }}>Regster</label>
        </section>
      )
      }
    </div>  
  )
}

export default HeaderComp
