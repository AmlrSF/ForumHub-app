const mongoose = require('mongoose');

const connectdb = async (url)=>{
    await mongoose.connect(url).then(
        ()=>console.log('mongodb connected.../')
    ).catch(err=>console.log(err))
}   

module.exports = connectdb;