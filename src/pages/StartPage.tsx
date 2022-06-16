import React, { useState } from 'react'
import SinglePost from '../components/SinglePost'
export interface IStartPage
{

} 

const StartPage = ( props: React.FC<IStartPage> ) => {
  return (
    <div className = 'd-flex'>
      <section style = {{ margin: 'auto' }}>
        <SinglePost /> 
      </section>
    </div>
  )
}

export default StartPage
