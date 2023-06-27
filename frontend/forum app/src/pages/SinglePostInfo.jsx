import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../context/context';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import IconButton from '@mui/material/IconButton';
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
            setPostinfo(finaldata?.date[0]);
            
        } catch (error) {
            console.log(error);
        }
    })()},[])
    console.log(postInfo);
  return (
    <div className='pt-5'>
        <img src={postInfo?.image} className='h-[450px] w-full ' />
        <CardHeader
        avatar={
          <Avatar sx={{background:"red"}} aria-label="recipe">
            R
          </Avatar>
        }
        title={postInfo?.author}
        subheader={postInfo?.createdTime}
      />
       <CardContent>
        <Typography variant='h4'>{postInfo?.title}</Typography>
        <Typography variant="body2" color="text.secondary">
         {postInfo?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ChatBubbleIcon />
        </IconButton>
      </CardActions>
    </div>
  )
}

export default SinglePostInfo