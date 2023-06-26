import React,{useEffect, useState} from 'react'
import { useContext } from 'react';
import { userContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

import { Post } from '../compounts';

const Home = () => {
  const {setData,data} = useContext(userContext);
  const navigate = useNavigate(); 
  const [posts,setposts] = useState([]);

  useEffect(()=>{
    (async ()=>{
      try {
           const token = window.localStorage;
            console.log(token);
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


    (async()=>{
      try {
        const responsePosts = await fetch('http://localhost:5500/api/v1/posts/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const finalPosts = await responsePosts.json();
        
        setposts(finalPosts.data);
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    })();
   
  },[])

  return (
    <div className='card-container pt-5'>
      {
        posts.map(post=>{
          return <Post data={post} />
        })
      }
    </div>
  )
}

export default Home