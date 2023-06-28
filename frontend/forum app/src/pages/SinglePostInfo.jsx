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
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/base/Button';
import Textarea from '@mui/joy/Textarea';
import Comment from '../compounts/Comment';

const SinglePostInfo = () => {
    const {id} = useParams();
    const {data} = useContext(userContext);
    const [postInfo,setPostinfo] = useState(null); 
    const [comment,setComment] = useState('');
    const [commentarrays,setCommentArrays] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{(async()=>{
        
        if(!data) navigate('/Login');
    
        try {
            const response = await fetch(`http://localhost:5500/api/v1/posts/${id}`);
            const finaldata = await response.json();
            console.log(finaldata);
            setPostinfo(finaldata?.date[0]);
            console.log(postInfo);
        } catch (error) {
            console.log(error);
        }
    })()},[])

    const handlecomment = async(e)=>{
      e.preventDefault();
      try {
          const response = await fetch(`http://localhost:5500/api/v1/posts/${id}/comment`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
                body: JSON.stringify({
                  username:data,
                  content:comment
                }),
        });
        
      const result = await response.json();
      setCommentArrays([...commentarrays,result.comment]);
      console.log(result);
      console.log(commentarrays);
      } catch (error) {
          console.log(error);
      }
    }
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
        {postInfo?.likes.length === '0' ? '' : postInfo?.likes.length }
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
        {postInfo?.comments.length === '0' ? '':postInfo?.comments.length }
          <ChatBubbleIcon />
        </IconButton>
      </CardActions>
      <CardContent sx={{marginTop:"10px"}}>
        <Typography variant='body2'>Add Comment</Typography>
       
       <form
          onSubmit={handlecomment}
        >
          <Textarea
            placeholder="Try to submit with no text!"
            required
            sx={{ mb: 1 }}
            onChange={(e)=>setComment(e.target.value)}
          />
          <Button sx={{background:'primary'}} color="primary" type="submit">Submit</Button>

        </form>
        <div className="mt-4 comment flex flex-col gap-2">
          {
            postInfo?.comments.map((comment,idx)=>{
              return <Comment infoComment={comment} key={idx} />
            })
          }
        </div>
      </CardContent>
    </div>
  )
}

export default SinglePostInfo