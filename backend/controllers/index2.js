const Post = require('../schema/index2.js');
const user = require('../schema/index');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dwsb4wnhn', 
    api_key: '369441825263223', 
    api_secret: 'AwoR08f77vI5MgphE75z2jeYnC0' 
  });
const addPost = async(req,res)=>{
    let {title,description,photo,author} = req.body;
    try {
                
        const photoUrl = await cloudinary.uploader.upload(photo);
        
        const newPost = await Post.create({
            title: title,
            description: description,
            createdTime: new Date(),
            image: photoUrl.url,
            author:author
        });

        res.status(200).json({ success: true, data: "post added successfully",newPost });

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, data: "internal server issue" });
    }
}

const getPosts = async(req,res)=>{
    try {
        const posts = await Post.find({});
        res.status(200).send({
            success:true,
            data:posts
        })    
    } catch (error) {
        res.status(400).json({ success: false, data: "internal server issue" });
    }
}

const getSinglePost = async(req,res)=>{
    let {id} = req.params;
    console.log(id);
    try {
        const singlePost = await Post.find({_id:id});
        console.log(id);
        res.status(200).send({sucess:true,date:singlePost});
    } catch (error) {
        res.status(200).send({sucess:false,msg:"internal server error"});
    }
}

const like = async(req,res)=>{
    const postId = req.params.postId;
    const username = req.body.username; // Assuming you have userId in the request body
    const User = await user.findOne({username});
    const post = await Post.findById(postId);
    
    try {
        console.log(User);
        // console.log(User,post);

      if (!User) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

     // Check if the user has already liked the post
     const hasLiked = post.likes.includes(User.username);

     if (hasLiked) {
        throw new Error('User has already liked the post');
      }

      post.likes.push(User.username);
      await post.save();
  
      const message = hasLiked ? 'Post unliked successfully' : 'Post liked successfully';
      return res.json({ message });
    } catch (error) {
        console.log(error);
      return res.status(500).json({ error: 'Error liking/unliking post' });
    }
}
const unlike = async(req,res)=>{
    const postId = req.params.postId;
    const userId = req.body.userId; // Assuming you have userId in the request body
    const User = await user.findById(userId);
    const post = await Post.findById(postId);

    try {
    
        console.log(User,post);

      if (!User) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

     // Check if the user has already liked the post
     const hasLiked = post.likes.includes(User.username);

     if(hasLiked){
        post.likes = post.likes.filter((username) => username !== User.username);
      await post.save();
  
      const message = hasLiked ? 'Post unliked successfully' : 'Post liked successfully';
      return res.json({ message });
     }
     
      
    } catch (error) {
        console.log(error);
      return res.status(500).json({ error: 'Error liking/unliking post' });
    }
}

const comment = async(req,res)=>{
    const postId = req.params.postId;
    const { username, content } = req.body; // Assuming you have username and content in the request body
  
    try {
      const post = await Post.findById(postId);
        console.log(post);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      const comment = {
        username,
        _id: new mongoose.Types.ObjectId(),
        content,
        createdTime: new Date()
      };
  
      post.comments.push(comment);
      await post.save();
  
      return res.json({ message: 'Comment created successfully', comment });
    } catch (error) {
        console.log(error);
      return res.status(500).json({ error: 'Error creating comment' });
    }
}

module.exports = {
    addPost,
    getPosts,
    getSinglePost,
    like,
    unlike,
    comment
}


  
 