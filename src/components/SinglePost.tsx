


import React, { useState } from 'react'


export interface ISinglePost {}

const SinglePost: React.FC<ISinglePost> = (props) => {
  const [ imageCount, setImageCount ] = useState<number>(0) 
  
  const [ testState,setTestState ] = useState({
    title: 'Enchanted Kingdom',
    body: 'Loren ask joh to come along but lily dosent want to go. while micheal is stupid reading arrabic text. toast is looking at miyoung nude fake piks while miyoung is miyoung , rae is shouting she is yea',
    uid: 'sampleuiduser',
    tag: 'laguna',
    date: '12-13-2021',
    img: ['https://res.cloudinary.com/dnnq8kne2/image/upload/v1635074121/fqrvnl717xgwo1zglbj5.jpg', 'https://res.cloudinary.com/dnnq8kne2/image/upload/v1634219047/xbbsv4mnjbeot2k4g9ah.jpg', 'https://res.cloudinary.com/dnnq8kne2/image/upload/v1634262726/djhbmcwyevwaenuwlrqk.jpg']
  })
  
  console.log(testState)

  return (
    <div style = {{ width: '800px', background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0px 0px 10px grey', margin: '10px' }}>
      <section>
        <div className = 'd-flex d-column'>
          <label style = {{ fontSize: '35px' }}>{testState.title}</label> 
          <label style = {{ color: 'grey', fontSize: '13px' }}>{testState.date}</label>
        </div>
        <div className = 'd-flex'>
          <section style = {{ 'flex': '1'}}> 
            <img src = { testState.img[0] }className = 'upload-image' />
            <div className = 'imageGroup d-flex gap-1 ' style = {{ background: 'white' }} >
              <img style = {{ height: '80px', 'flex': '3' }} src = { testState.img[1] } />
              <img style = {{ height: '80px', 'flex': '3'}} src = { testState.img[2] } />
              <label className = '' style = {{ 'flex': '8' }}></label>
            </div>
          </section>
          <section style = {{ 'flex': '1', textIndent: '15px', textAlign: 'justify', padding: '10px' }}>
            <label style = {{ }}>{testState.body}</label><br />
            <a href = '#'>Read more..</a>
          </section>
        </div>
        <label></label>
      </section> 
    </div>
  )
}

export default SinglePost
