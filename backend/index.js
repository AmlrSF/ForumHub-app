const express = require('express');
const app = express();
const user = require('./routes/route');
const post = require('./routes/route1');
const cors = require('cors');
const connect = require('./db/connect')
const cookieParser = require('cookie-parser');

require('dotenv').config();

//middleawre
app.use(express.json({limit:'50mb'}));
app.use(cors())
app.use(cookieParser())

app.use('/api/v1/users',user);
app.use('/api/v1/posts',post);

// app.get('/api/v1/users/nice',(req,res)=>{
//     res.send('hello')
// })

const {MONGODB_URL} = process.env;

const PORT = 5500;
(async(url)=>{
    try {
        connect(url);
       
        app.listen(PORT,()=>{
            console.log(`the server is currently running on ${PORT}.../`);
        })
    } catch (error) {
        
    }
})(MONGODB_URL);