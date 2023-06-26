const Post = require('../schema/index2.js');
const user = require('../schema/index.js');

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
module.exports = {
    addPost,
    getPosts,
    getSinglePost
}


  
 