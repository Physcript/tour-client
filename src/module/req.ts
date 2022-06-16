import React from 'react'

interface IRequest {
  url: string,
  method: string,
  body?: any
}


const req = (props: IRequest) => {
  
   return new Request(`http://localhost:1337/api${props.url}`, {
    method: props.method,
    headers: { 'Content-Type': 'application/json', token: `${localStorage.getItem('token')}` },
    body: props.body ?? undefined
  })
    
}

export default req
