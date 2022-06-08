
import React, { useState } from 'react'
import req from '../module/req'
export interface ICreatePost {}


const CreatePost = ( props:any ) => {
    const [ defaultImage, setDefaultImage ] = useState<string>('https://res.cloudinary.com/dnnq8kne2/image/upload/v1654587009/Tour/qy3u9be6ppp2aedk2n57.jpg') 
    const [ userFile,setUserFile ] = useState<File>()
    let [ fileCount,setFileCount ] = useState<number>(0)
    const [ previewSource, setPreviewSource ] = useState<any>()
    const [ image,setImage ] = useState<any[]>([{}]) 
    const [ imageError,setImageError] = useState<string>('')
  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError('')

    if(e.target.files!.length >= 5)
      {
        setImageError('Maximum of 4 image')
        return
      }
  
    Array.from(e.target.files!).forEach(file => {

      const formData = new FormData()
      formData.append('img', file)
      
      fetch('http://localhost:1337/api/p/upload', {
        method: 'post',
        body: formData
      })
      .then((stat) => {
        if(stat.status === 200)
          {
            stat.json().then((res) => {
              const { public_id, url } = res.message.upload 

              console.log(public_id)
              console.log(url)

              setImage((val) => ({
                  ...val,
                  [fileCount += 1]: {
                      public_id,
                      url
                    }
                }))

            })
          }
        else
          {
            stat.json().then((res) => {
              console.log(res)
            })
          }
      })
    })
  }


  const previewFile = (file: File) => {
    
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
 }
  return (
    
    <div>

      <section style = {{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <input type = 'text' placeholder = 'Title' />
        <textarea placeholder = 'Description' rows = { 10 } />
        <input type = 'text' placeholder = 'Location' />
        <label> { imageError } </label>
        <input accept = "image/*" type = 'file' multiple onChange = { fileHandler } />
      </section> 


      <section style = {{ width: '50%'}} >    
        {  
          image[1] != undefined ?
          (
            <div>
              <img src = { image[1].url } className = 'upload-image' />
            </div>
          ) : 
            <div>
              <img src = { defaultImage } />
            </div>
        }
      </section>
      <section style = {{ width: '50%', display: 'flex', justifyContent: 'space-around' }} >

        <img src = { image[2] != undefined ? (image[2].url) : ( defaultImage ) } style = {{ height: '150px' }} />
        <img src = { image[3] != undefined ? (image[3].url) : ( defaultImage ) } style = {{ height: '150px' }} />
        <img src = { image[4] != undefined ? (image[4].url) : ( defaultImage ) } style = {{ height: '150px' }} />
      </section>

      <section>
        <button>create</button>
      </section>
    </div>
  )
}

export default CreatePost
