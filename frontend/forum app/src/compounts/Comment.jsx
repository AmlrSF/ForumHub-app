import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';


import { useNavigate } from 'react-router-dom';
const Comment = ({infoComment}) => {
    let {content,createdTime,username,_id} = infoComment;

    const navigate = useNavigate();
  return (
    // onClick={navigate(`/profile/${username}`)}
    <Card onClick={()=>navigate(`/profile/${username}`)}>
        <CardHeader
            avatar={
            <Avatar sx={{background:'red'}} aria-label="recipe">
                {username[0]}
            </Avatar>
            }
            
            title={username}
            subheader={createdTime}
        />

        <CardContent>
            <Typography variant='h5' color='text.secondary'
            >   {content}
            </Typography>
        </CardContent>
    </Card> 
  )
}

export default Comment

