import React, { useEffect, useState } from 'react'
import preview from '../assests/preview.png';
import { ToastContainer ,toast} from 'react-toastify';
import { useContext } from 'react';
import { userContext } from '../context/context';
import {useNavigate} from 'react-router-dom';

const CreatePosts = () => {
  const {data} = useContext(userContext);
  const [post, setPost] = useState(false);
  const [form,setForm] = useState({
    title:'',
    description:'',
    photo:''
  })
  const navigate = useNavigate();

  useEffect(()=>{
    if(!data) navigate('/Login');
  },[]);

  const handleChangeName = (e)=>{
    setForm({...form,title:e.target.value})
  }
  const handleChangeDesc = (e)=>{
    setForm({...form,description:e.target.value})
  }

  const handlePhoto= (e)=>{
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = ()=>{
      setForm({...form,photo:reader.result});
    }
    reader.onerror = (err)=>console.log(err);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    let {photo,title,description} = form;
    try {
        setPost(true);
        if(title&&description&&photo){
          // console.log(user);
          
          const response =  await fetch('http://localhost:5500/api/v1/posts/CreatePost',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...form,author:data}),
          }) 
          const finaldata = await response.json();
          console.log(finaldata);
          if(finaldata.success == false){
            toast.error(data.data, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          }else{
            toast.success(finaldata.data, {
              position: toast.POSITION.BOTTOM_RIGHT
            });   
          }  
        }else{
          setPost(false);
          toast.error('please fill in the inputs fields', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
    } catch (error) {
      console.log(error);
    } finally{
      setPost(false);
      setForm({
        title:'',
        description:'',
        photo:''
      })
    }
  }

  return (
    <>
      <ToastContainer />
    <div className='w-full h-full p-2 sm:p-6'>
      <h1 className='text-[22px] sm:text-[28px] text-[#222]'>
          Create Your posts
      </h1>
      <form onSubmit={handleSubmit} className='mt-4'>
        <div className='flex flex-col gap-4 '>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label
                  htmlFor='title'
                  className="block text-sm font-medium text-gray-900"
                >
                  Title
                </label>
              </div>
              <input
                    style={{display:'block'}}
                    type='text'
                    name='title'
                    className="bg-gray-50 
                    border border-gray-300  text-gray-900
                    text-sm rounded-lg focus:ring-[#6469ff] 
                    focus:border-[#6469ff] 
                    outline-none block w-[100%] sm:w-[250px]  p-3"
                    placeholder='Enter a title'
                    value={form.title}
                    onChange={handleChangeName}
                    required
                />
          
            </div>

            <div>
                <div className="flex items-center gap-2 mb-2">
                  <label
                    htmlFor='description'
                    className="block text-sm font-medium text-gray-900"
                  >
                    description
                  </label>
                </div>
                <textarea style={{display:'block'}}
                      type='text'
                      name='description'
                      className="bg-gray-50 
                      border border-gray-300  text-gray-900
                      text-sm rounded-lg focus:ring-[#6469ff] 
                      focus:border-[#6469ff] 
                      outline-none block w-[100%] sm:w-[250px]  p-3"
                      placeholder='Enter a title'
                      value={form.description}
                      onChange={handleChangeDesc}
                      required
                ></textarea>
            </div>

            
              <div>
                  <input type='file'
                      id={form.title}
                      name={form.title}
                      accept='image/*'
                      className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-[100%] sm:w-[250px]  p-3"
                      onChange={handlePhoto}
                      required
                  />
                  <div className="mt-5 relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                      { form.photo ? (
                        <img
                          src={form.photo}
                          alt={form.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={preview}
                          alt="preview"
                          className="w-9/12 h-9/12 object-contain opacity-40"
                        />
                      )}
              </div>
            </div> 
            <div>
              
            </div>
          </div>
          <div className="mt-5 flex gap-5">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className=" text-white bg-[#6469ff] text-white font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {post ? 'Posting...' : 'Post Now'}
              </button>
          </div>                
        </form>
    </div>
    </>
  )
}

export default CreatePosts;

                