import React, { useContext, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/context';
const Post = ({info}) => {
    const {id} = useParams();
    let {author,comments,createdTime,description,image,likes,title,_id} = info;
    const navigate = useNavigate();
    const [postlikes,setPostLikes] = useState('');
    const {data} = useContext(userContext);
    const handleinfo = ()=>{
        return navigate(`/post/${_id}`)
    }
    const handlelike = async()=>{
        try {
            const response = await fetch(`http://localhost:5500/api/v1/posts/${id}/like`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({username:data}),
        });

        const result = await response.json();
        } catch (error) {
            
        }
    }
    return (
    <Card>
        <CardHeader
            avatar={
            <Avatar sx={{background:'red'}} aria-label="recipe">
                
            </Avatar>
            }
            
            title={author}
            subheader={createdTime}
      />
       <CardMedia
        component="img"
        image={image}
        sx={{height:'260px',objectFit:"cover"}}
        alt="Paella dish"
      />
        <CardContent>
            <Typography variant='h6' color='text.secondary'
            >
                {title}
            </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={handlelike}>
                {likes.length === 0 ? '':likes.length }
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                {comments.length === 0 ? '':comments.length }
                <ChatBubbleIcon />
            </IconButton>
            <IconButton onClick={handleinfo}>
                <AddCircleIcon />
            </IconButton>
        </CardActions>
            
    </Card>
  )
}

export default Post