
import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth/context'
import req from '../module/req'

var img_02 = require('../assets/login.jpg')

export interface ILoginComp {}

export interface ILogin {
  email: string,
  password: string
}

const LoginComp = ( ) => {
  const userContext = useContext(AuthContext)
  const navigate = useNavigate()
  const [ userInput,setUserInput ] = useState<ILogin>({
      email: '',
      password:  ''
    })

  const [ error,setError ] = useState<string>('')
  const [ success,setSuccess ] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name,value } = e.target
    setUserInput((val) => ({
        ...val,
        [name]: value
      }))
  }


  const loginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const _req = req({ url: '/u/login', method: 'POST', body: JSON.stringify(userInput) })
    fetch(_req).then((val) => {
      if(val.status === 200)
        {
          val.json().then((res) => {
            setError('')
            const { user,token } = res.message
            userContext.userDispatch({ TYPE: 'LOGIN', PAYLOAD: { USER: user, TOKEN: token }  })
            localStorage.setItem('token', token)
            setUserInput({ email: '', password: '' }) 
            navigate('/')
          })
        }
      else
        {
          val.json().then((res) => {
            setError(res.error)
            setSuccess('')
          })
        }
    })
    .finally(() => {
      
    })
  }

  return (
    <div className = 'container h-90'>
      <div className = 'fill'>
        <section style = {{ flex: '1' }}>
          {
            error !== '' ? (
              <section className = 'box-error' style = {{ width: '50%', margin: 'auto', gap: '10px' }} >
                <label>{ error }</label>
              </section>
            ) : (
              <section>
              
              </section>
            )
          }
          <section className = 'd-flex d-column' style = {{ width: '50%' , margin: 'auto' , gap: '10px'}}>
            <h1>Login</h1>
            <input 
              placeholder = 'Email'
              name = 'email'
              value = { userInput.email }
              onChange = { onChange }
            /> 
            <input 
              placeholder = 'Password' 
              name = 'password'
              value = { userInput.password }
              onChange = { onChange }
            />
            <button style = {{ width: '50%' }} onClick = { loginHandler }>Login</button>
          </section>
        </section>
        <section style = {{ flex: '1' }}>
          <img src = { img_02 } />
        </section>
      </div>
    </div>
  )
}

export  default LoginComp
