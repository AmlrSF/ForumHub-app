import React from 'react'
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
import { useNavigate } from 'react-router-dom';
const Post = ({data}) => {
    console.log(data);
    let {author,comments,createdTime,description,image,likes,title,_id} = data;
    const navigate = useNavigate();
    const handleinfo = ()=>{
        return navigate(`/post/${_id}`)
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
            <IconButton aria-label="add to favorites">
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