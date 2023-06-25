import React,{useEffect} from 'react'
import { useContext } from 'react';
import { userContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const {setData,data} = useContext(userContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!data) return navigate('/Login')
    (async ()=>{
      try {
           const token = window.localStorage;
            
          // console.log(token);
          await fetch('http://localhost:5500/api/v1/users/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(token)
          }).then(res=>res.json())
            .then(res=>{
              if(res.succes === false){
                navigate('/Login')
              }else{
                setData(res.user.username)
              }
            })

        } catch (error) {
          console.log(error);
        }
    })();
    
  },[])

  return (
    <div>
      
    </div>
  )
}

export default Home