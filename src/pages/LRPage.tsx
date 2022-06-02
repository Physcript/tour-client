

import React , { useState } from 'react'
import LoginComp from '../components/LoginComp'
import req from '../module/req'

var imag_01 = require('../assets/register.jpg')

export interface ILRPage {}
interface IRegister {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}

interface IERegister {
  Firstname?: string,
  Lastname?: string,
  Email?: string,
  Password?: string,
  ConfirmPassword?: string,
}



const LRPage = (props: React.FC<ILRPage>) => {
  
  const [ userInput, setUserInput ] = useState<IRegister>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [ error,setError ] = useState([])
  const [ success,setSuccess ] = useState<string>('')

  const registerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const url = '/u/create'
    const method = 'POST'
    const body = JSON.stringify(userInput)
    const request = req({ url,method,body })
    
    fetch(request)
      .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              setError([])
              setSuccess('Account created')
              setUserInput({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
              })
            })
          }
        else
          {
            val.json().then((res) => {
              let _error: any = []
              Object.entries(res.error).forEach(([key,value])=> {
                _error.push(value)
              })
              setError(_error)
              setSuccess('')

            })
          }
      })

  }
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const { name,value } = e.target
    setUserInput((val) => ({
      ...val,
      [name] : value
    }))

  }



  if(window.location.pathname.includes('login'))
    {
      return (
        <LoginComp /> 
      )
    }
  return (
    <div className = 'container h-90'>
      <div className = 'fill'>


      <section style = {{ flex: '1' }}>
        <img src = { imag_01 } />
      </section>

      <section className = 'registerForm' style = {{ flex: '1'}} >
        {
          
          Object.keys(error).length >= 1 ?
          (
            <div className = 'd-flex d-column gap-1 box-error w-50'>
              {
                error.map((err,index) => {
                  return (
                    <label>{err}</label>
                  )
                })
              }
            </div>
          ):
          (
            <div className ='box-success w-50'>
              <label>{ success }</label>
            </div>
          )

        }
        <section className = 'd-flex d-column w-50'>

          <h1>Register</h1>
          <input 
            placeholder = 'Firstname'
            name = 'firstName'
            value = { userInput.firstName }
            onChange = { onChange }
          />
          <input 
            placeholder = 'Lastname'
            name = 'lastName'
            value = { userInput.lastName }
            onChange = { onChange }
          />
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
          <input
            placeholder = 'Confirm Password' 
            name = 'confirmPassword'
            value = { userInput.confirmPassword }
            onChange = { onChange }
          />
          <button style = {{ width: '50%' }} onClick = { registerHandler }>Regiter</button>
        </section>
      </section>
      </div>
    </div>
  )
}

export default LRPage
