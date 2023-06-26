import React, { useContext, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { userContext } from '../context/context';

const Header = () => {
  const navigate = useNavigate();
  const {data,setData} = useContext(userContext);
  const handleLogout = ()=>{
    setData('');
    localStorage.clear();
    navigate('/Login');
  }
  return (
    <header 
      className='flex justify-between items-center
      bg-white sm:px-8 px-4 py-4 border border-b border-b-[#e6ebf4]'>
      <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-5 w-full'>
      <Link to='/' className='text-[25px] mr-4 font-bold text-[#222328]'>Forum</Link>
        <ul className='list-none flex items-center justify-between  gap-[15px]'>
          <Link to='/' className='text-[14px] underline font-600 text-[#222328]'>Home</Link>
          <Link to='/CreatePost' className='text-[14px] underline font-600 text-[#222328]'>New Post</Link>
        </ul>
        <div className='flex gap-2'>
          {data ? 
            <>
              <div className='flex justify-between items-center gap-[15px]'>
                <h1 className='text-[16px] text-green-700 font-medium'>
                  {data}
                </h1>
                <button  onClick={handleLogout}
                  className=" text-white font-medium bg-green-700 font-medium
                  rounded-md text-sm  
                    px-5 py-2.5 text-center">
                    Logout 
                </button>
              </div>
            </>
          : 
            <>
              <button onClick={()=>navigate('/SignUp')} 
              className=" text-white font-medium bg-[#6469ff] font-medium
              rounded-md text-sm  
                px-5 py-2.5 text-center">
                Sign Up
              </button>
              <button onClick={()=>navigate('/Login')} 
              className=" text-white font-medium bg-[#6469ff] font-medium
              rounded-md text-sm  
                px-5 py-2.5 text-center">
                Login 
              </button>
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default Header