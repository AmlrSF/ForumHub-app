import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [form,setForm] = useState({
    username:'',
    email:'',
    password:''
  })

  const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    let {username,email,password} = form;
    try {
      const response = await fetch('http://localhost:5500/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form }),
      });

        const result = await response.json();
        console.log(result);
        if(result.errors === undefined){
          toast.success('register succes', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          navigate('/Login');
        }

        result.errors.forEach(element => {
          toast.error(element.msg, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }); 
    } catch (error) {   
      console.log(error);
  }
  }

  const handleUser = (e)=>setForm({...form,username:e.target.value});
  const handlEmail = (e)=>setForm({...form,email:e.target.value});
  const handlePass = (e)=>setForm({...form,password:e.target.value});
  return (
    <>
    <ToastContainer />
     <div className='max-7xl 
     mx-auto flex items-center 
     justify-center h-[80vh]'>
     <div className='shadow-lg rounded-sm  xs:w-[400px] rounded bg-white p-5'>
       <form onSubmit={handleSubmit}>
         <h1 className='text-center font-bold mb-7 text-[#6469ff] text-[30px]'>Register</h1>
         <label
           htmlFor='username'
           className="block text-md text-[#6569ff] font-medium text-gray-900">
           username</label>
         <input
             type='text'
             id='username'
             name='username'
             className="bg-gray-50 mb-3
             border border-gray-300   text-gray-900
             text-sm rounded-lg focus:ring-[#6469ff] 
             focus:border-[#6469ff] 
             outline-none block w-[100%]   
             p-3"
             placeholder='username'
             value={form.username}
             onChange={handleUser}
             required
           />
           <label
           htmlFor='email'
           className="block text-md text-[#6569ff] font-medium text-gray-900"
         >
           email
         </label>
         <input
             type='text'
             id='email'
             name='email'
             className="bg-gray-50 mb-3
             border border-gray-300  text-gray-900
             text-sm  rounded-lg focus:ring-[#6469ff] 
             focus:border-[#6469ff] 
             outline-none block w-[100%]   
             p-3"
             placeholder='username'
             value={form.email}
             onChange={handlEmail}
             required
           />
           <label
           htmlFor='username'
           className="block text-[#6569ff]   text-md font-medium text-gray-900"
         >
           password
         </label>
         <input
             type='password'
             id='username'
             name='username'
             className="bg-gray-50 mb-3
             border border-gray-300  text-gray-900
             text-sm rounded-lg focus:ring-[#6469ff] 
             focus:border-[#6469ff] 
             outline-none block w-[100%]   
             p-3"
             placeholder='password'
             value={form.password}
             onChange={handlePass}
             required
           />
             <input type='submit' 
           className=" text-white cursor-pointer  font-medium bg-[#6469ff] font-medium
           rounded-md text-sm w-full  
             px-5 py-2.5 text-center"
            value='Register'
           />
           <p className='mt-3 flex gap-2 flex-wrap justify-between text-gray-400'>
             Already have an account! 
             <span onClick={()=>navigate('/Login')} className='cursor-pointer text-[#6469ff] underline decoration-1'>Login here</span></p>
         </form>
     </div>
   </div>
  </>
  )
}

export default SignUp