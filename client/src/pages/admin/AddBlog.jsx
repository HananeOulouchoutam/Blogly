import React, { useState } from 'react'
import {assets} from '../../assets/assets'

const AddBlog = () => {
  

  const [data , setData] = useState({
    image : "" , 
    title : "" , 
    subTitle : "" , 
    category : "Startup",
    isPublished : false 
  }) 

  const onChangeHandler = (e)=> {
     const {name , value , files } = e.target ;
     if(name === 'image') {
      setData ({...data , [name]:files[0]})
     }else {
        setData({...data , [name]:value})
     } 
  } 


  const onSubmitHandler = async (e)=> {
     e.preventDefault();
     console.log(data)
     setData({
      image : "" , 
    title : "" , 
    subTitle : "" , 
    category : "Startup",
    isPublished : false 
     })
  }

  const  generateContent = async ()=> {

  }

  return (
    <form  onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll' >
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload thumbnail</p>
        <label htmlFor='image'>
          <img src={ !data.image ? assets.upload_area : URL.createObjectURL(data.image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input type="file" id='image'  name="image" onChange={onChangeHandler} hidden required />
        </label>
        
       <label htmlFor="title" >
         <p className='mt-4'>Blog title</p>
        <input type="text" name="title" id="title" placeholder='Type here' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' value={data.title}
        onChange={onChangeHandler} required/>
       </label>

       <label htmlFor="subTitle" >
         <p className='mt-4'>Sub title</p>
        <input type="text" name="subTitle" id="subTitle" placeholder='Type here' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' value={data.subTitle}
        onChange={onChangeHandler} required/>
       </label>

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <button type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with IA</button>

        </div>

       <button type='submit'>SEND</button>

      </div>

    </form>
  )
}

export default AddBlog
