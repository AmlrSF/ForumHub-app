import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../context/context';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { Post } from '../compounts';

const SinglePostInfo = () => {
    const {user} = useParams();
    const {data} = useContext(userContext);
    const [postInfo,setPostinfo] = useState([]); 

    const navigate = useNavigate();
    useEffect(()=>{(async()=>{
        
        if(!data) navigate('/Login');
        console.log(user);
        try {
            const response = await fetch(`http://localhost:5500/api/v1/posts/post/${user}`);
            const finaldata = await response.json();
            setPostinfo(finaldata?.data);
            console.log(postInfo);
        } catch (error) {
            console.log(error);
        }
    })()},[])
   
    
    const getLikes = ()=>{
        var cpt = 0;
        for (let i = 0; i < postInfo.length; i++) {
           for (let j = 0; j < postInfo[i].likes.length; j++) {
            cpt++;
            
           }
            
        }
        return cpt
    }
    const getComments = ()=>{
        var cpt = 0;
        for (let i = 0; i < postInfo.length; i++) {
           for (let j = 0; j < postInfo[i].comments.length; j++) {
            cpt++;
            
           }
            
        }
        return cpt
    }
    
    
  return (
    <>
  <Card
      orientation="horizontal"
      variant="outlined"
      sx={{ width: '100%',marginBlock:'20px', bgcolor: 'background.body' }}
    >
      
    
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
        Welcome {user}
        </Typography>
        <Typography level="body2">
            number of posts : {postInfo.length}
            
            
        </Typography>
        <Typography variant='body2'>number of likes : {getLikes()}</Typography>
        <Typography variant='body2'>number of comments : {getComments()}</Typography>
      </CardContent>
      <CardOverflow
        variant="soft"
        color="primary"
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          textAlign: 'center',
          fontSize: 'xs2',
          fontWeight: 'xl2',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        profile
      </CardOverflow>
    </Card>
    <div className='card-container pt-5'>
       
        {
         postInfo.map((post,index)=>{
             return <Post info={post} key={index+1}/>
       })
        }
    </div>
    </>
    
  )
}

export default SinglePostInfo