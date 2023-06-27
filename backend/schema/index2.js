const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdTime: {
    type: Date,
    default: Date.now
  },
  image:{
      type:String,
      required:true
  },
  comments: [{
    username: {
      type: String,
      required: true
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdTime: {
      type: Date,
      default: Date.now
    }
  }],
  likes: [{
    type: String,
  }],
  author: {
    type: String,
    required: true
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
