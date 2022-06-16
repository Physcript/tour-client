
import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import AuthContext from '../context/auth/context'
import req from '../module/req'

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

  if( userContext.userState.STATUS === false && localStorage.getItem('token') !== '')
    {
      const url = '/u/auth'
      const method = 'GET'

      const _req = req({ url,method })
  

  fetch(_req)
    .then((response) => {
      if(response.status === 200)
        {
          response.json().then((res) => {
            const { user,token } = res.message
            userContext.userDispatch({ TYPE: 'LOGIN' , PAYLOAD: { USER: user, TOKEN: token } })
          })
        }
      else
        {
          response.json().then((res) => {
            localStorage.setItem('token', '')
          })
        }
    })

    }

   

  return (
    <div className='d-flex d-space-between container headerComp' style = {{ height: '10vh' }}>
      <section>
        <label onClick = { () => { navigate('/panel') } } >Logo</label>
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
