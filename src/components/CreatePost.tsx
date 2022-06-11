
import { upload } from '@testing-library/user-event/dist/upload'
import { abort } from 'process'
import React, { useState , useContext , useEffect , Component} from 'react'
import AuthContext from '../context/auth/context'
import req from '../module/req'
export interface ICreatePost {}
export interface IEUserInput {
  title?: string,
  description?: string,
  image?: any,
  location?: string
}


const CreatePost = ( props:any ) => {
    const userContext = useContext(AuthContext)

    const [ defaultImage, setDefaultImage ] = useState<string>('https://res.cloudinary.com/dnnq8kne2/image/upload/v1654587009/Tour/qy3u9be6ppp2aedk2n57.jpg') 
    const [ userInput, setUserInput ] = useState({
      title: '',
      description: '',
      location: ''
    })

    const [ errorUserInput,setErrorUserInput ] = useState<IEUserInput | undefined>()
    const [ userFile,setUserFile ] = useState<File>()
    let [ fileCount,setFileCount ] = useState<number>(0)
    const [ previewSource, setPreviewSource ] = useState<any[]>([])
    const [ image,setImage ] = useState<any[]>([{}]) 
    const [ imageError,setImageError] = useState<string>('')
    
    const [ _file,set_File ] = useState<FileList>()

    const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setImageError('')
      setPreviewSource([])
      setFileCount(0)

      if(e.target.files!.length >= 5)
        {
          setImageError('Maximum of 4 image')
          return
        }

      setFileCount(e.target.files!.length) 
      set_File(e.target.files!)

      Array.from(e.target.files!).forEach(file => {
        
          previewFile(file)
       
      })


      
    }

    const uploadHandler = () => {
      
    setImageError('')
  
    Array.from(_file!).forEach(file => {

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
      setPreviewSource(val => [...val, reader.result])
    }
  }

  const createHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
    setErrorUserInput(undefined) 

    if(userInput.title.trim() === '') 
      {
        setErrorUserInput((val:any) => ({
            ...val,
            title: 'Title required'
          }))
        return
      }


    if(userInput.location.trim() === '')
      {
        setErrorUserInput((val:any) => ({
            ...val,
            location: 'Location required'
          }))
        return
      }


    if(userInput.description.trim() === '')
      {
        setErrorUserInput((val:any) => ({
          ...val,
          description: 'Description required'
        }))
        return
      }


    if(fileCount === 0)
      {
        setErrorUserInput((val:any) => ({
          ...val,
          image: 'Image required'
        }))
        return
      }    
    
    _end()
  }


  const _end = () => {
  
  const formData = new FormData()

  formData.append('title',  userInput.title )
  formData.append('description', userInput.description)
  formData.append('tag', userInput.location)
  formData.append('_uid', userContext.userState.USER.uid)
  formData.append('email', userContext.userState.USER.email)
  
  Array.from(_file!).forEach((file) => {
    formData.append('img', file)
  })  

  let url = 'http://localhost:1337/api/p/create'
  const _request = new Request(url, {
    method: 'POST',
    headers: { 'token' : `${localStorage.getItem('token')}` } ,
    body: formData
  })

  fetch(_request)
    .then((val) => {
    if(val.status === 200) 
      {
        val.json().then((res) => {
          let { postId } = res.message 
          uploadHandler()

        })
      }
    else
      {

      }

  })

  //fetching
  //
    
    

  }

  const _onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name,value } = e.target 
    setUserInput((val) => ({
        ...val,
        [name]:value
      }))
  }
  


  return (
    
    <div>

      <section style = {{ display: 'flex', flexDirection: 'column', width: '50%' }}>
         
        {
          <div style = {{ display: 'flex', flexDirection: 'column' }}>
          <label>{ errorUserInput?.title }</label> 
          <label>{ errorUserInput?.description }</label>
          <label>{ errorUserInput?.image }</label>
          <label>{ errorUserInput?.location }</label>
          </div>
        
        }

        <input 
          type = 'text' 
          placeholder = 'Title' 
          name = 'title'
          onChange = { _onChange }
          value = { userInput.title }
        />
        <textarea placeholder = 'Description' rows = { 10 } 
          name = 'description'
          value = { userInput.description }
          onChange = { _onChange }
        />
        <input type = 'text' placeholder = 'Location'
          name =  'location'
          onChange = { _onChange }
          value  = { userInput.location }
        />
        <label> { imageError } </label>
        <input accept = "image/*" type = 'file' multiple onChange = { fileHandler } onClick = { (e:any) => e.value = null }/>
      </section> 


      <section style = {{ width: '50%'}} >    
          <img src = { previewSource[0] != undefined ? (previewSource[0]) : ( defaultImage ) } style = {{ height: '400px' }} />
      </section>
      <section style = {{ width: '50%', display: 'flex', justifyContent: 'space-around' }} >

        <img src = { previewSource[1] != undefined ? (previewSource[1]) : ( defaultImage ) } style = {{ height: '150px' }} />
        <img src = { previewSource[2] != undefined ? (previewSource[2]) : ( defaultImage ) } style = {{ height: '150px' }} />
        <img src = { previewSource[3] != undefined ? (previewSource[3]) : ( defaultImage ) } style = {{ height: '150px' }} />
      
      </section>

      <section>
        <button onClick = { createHandler }>create</button>
      </section>
    </div>
  )
}

export default CreatePost
