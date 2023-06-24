const mongoose = require('mongoose');

const shcemaUser = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    },

})





module.exports = mongoose.model('user',shcemaUser);

