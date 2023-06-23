import React, { useState } from 'react'
import {Link} from 'react-router-dom';

const Header = () => {
  const [user,setUser] = useState('');

  return (
    <header 
      className='flex justify-between items-center
      bg-white sm:px-8 px-4 py-4 border border-b border-b-[#e6ebf4]'>
      <div className='flex flex-col sm:flex-row justify-between items-center gap-5 w-full'>
        <ul className='list-none flex items-center justify-between  gap-1.5'>
          <Link to='/' className='text-[25px] mr-4 font-bold text-[#222328]'>Forum</Link>
          <Link to='/' className='text-[14px] font-600 text-[#222328]'>Home</Link>
        </ul>
        <div className='flex gap-2'>
          {user ? 
            <>
            <button onClick={()=>navigate('/Dashboard')} 
              className=" text-white font-medium bg-green-700 font-medium
              rounded-md text-sm  
                px-5 py-2.5 text-center">
                {user}
              </button>
              <button onClick={()=>logout()} 
              className=" text-white font-medium bg-green-700 font-medium
              rounded-md text-sm  
                px-5 py-2.5 text-center">
                Logout 
            </button>
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