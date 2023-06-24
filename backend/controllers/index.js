const user = require('../schema/index')
const {validationResult}  = require('express-validator');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async(req,res)=>{
    let {password,username,email} = req.body;

    try {
        const validatorsResultErorrs = validationResult(req);
        if(!validatorsResultErorrs.isEmpty()){
            return res.status(400).json({
                success:false,
                errors : validatorsResultErorrs.array()
            })
        }

        const userExist = await user.findOne({email});
        if(userExist){
            return res.status(400).send({
                "errors": [
                        {
                            "type": "email",
                            "value":email,
                            "msg": "this user already exists",
                        }
                ]
                
            })
        }

        const saltRounds = 10;
        const hashedpass = await bycrpt.hash(password, saltRounds)
    
        const servedUser = await user.create({
            username,
            email,
            password:hashedpass
        })

        res.json({
            succes:true,user:servedUser
        })
    } catch (error) {
        res.status(500).json(
            {
                success:false,
                message:"internal server error"
            }
        );
    }
}
const Login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        let MatchUser = await user.findOne({email}); 

        if(!MatchUser) return res.status(400).send({
            "errors": [
                    {
                        "type": "email",
                        "value":email,
                        "msg": "sry, there no user by this credentials",
                    }
            ]
        })
        let matched =  await bycrpt.compare(password,MatchUser.password);
        if(!matched){
            return res.status(400).send({
                "errors": [
                        {
                            "type": "password",
                            "value":password,
                            "msg": "invalid Password",
                        }
                ]
            })
        }
        //genrate token 
        const token  = jwt.sign({
                id:MatchUser._id,
                username:MatchUser.username
            },
            process.env.secretKey,
            {
            expiresIn: "30s"
            }
        )
        res.cookie(String(MatchUser._id),token,{
            path:'/',
            expiresIn:new Date(Date.now() + 1000 * 30),
            httpOnly:true,
            sameSite:"lax"
        })



        res.json({
            succes:true,user:MatchUser,token
        })
    } catch (error) {
        res.status(500).json(
            {
                success:false,
                message:"internal server error"
            }
        );
    }
}

const verifyToken = async(req,res,next)=>{
    const header = req.headers.cookie;
    
    const token = header.split('=')[1];
   const finalToken = token.split('; ')[0];
    if(!token){
        return res.status(404).send({
            success:false,
            message:"no token found"
        })
    }
    
    jwt.verify(String(finalToken),process.env.secretKey,(err,result)=>{
        if(err) {
            // console.log(String(token));
            return res.status(400).send({
                success:false,
                message:"invalid token"
            })
            
        }
        // console.log(result.id);
        req.id = result.id;
    })
    next();
}

const getUser = async(req,res)=>{
    const userId = req.id;
    try {
        const profileUser = await user.findOne({_id:userId})
        if(!profileUser){
            return res.status(404).json({
                succes:false,
                message:"user not found",
            })
        }

        return res.status(200).send({
            succes:true,
            message:"user found",
            user:profileUser
        })
    } catch (error) {
        res.status(500).json(
            {
                success:false,
                message:"internal server error"
            }
        );
    }
}

module.exports = {
    register,
    Login,
    verifyToken,
    getUser
}