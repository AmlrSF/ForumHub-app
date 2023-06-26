import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../context/context';

const SinglePostInfo = () => {
    const {id} = useParams();
    const {data} = useContext(userContext);
    const [postInfo,setPostinfo] = useState(null);

    const navigate = useNavigate();
    useEffect(()=>{(async()=>{
        
        if(!data) navigate('/Login');
    
        try {
            const response = await fetch(`http://localhost:5500/api/v1/posts/${id}`);
            const finaldata = await response.json();
            console.log(finaldata);
            setPostinfo(finaldata.date);
            console.log(postInfo);
        } catch (error) {
            console.log(error);
        }
    })()},[])
  return (
    <div>
        tttttttttttt
    </div>
  )
}

export default SinglePostInfo