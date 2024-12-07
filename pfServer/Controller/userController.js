
const users= require('../Model/userModel')

const jwt=require('jsonwebtoken')



exports.register=async(req,res)=>{
    console.log("inside register function");
    const{username,email,password}=req.body
    console.log(username,email,password);
    

    try{
        //check user already exist or not

        const existingUser =await users.findOne({email})

if(existingUser){
    res.status(406).json("user already exist")
}else{
    const newUser=new users({
        username,email,password,github:"",linkedin:"",profile:""
    })
    await newUser.save()
    res.status(200).json(newUser)
}

    }catch(err){
   res.status(401).json(err)
    }
    
    
}

exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{

        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},process.env.jwt_secret)
            res.status(200).json({existingUser,token})
        }else{
            res.status(406).json("invalid email/password")
        }

    }catch(err){
        res.status(401).json(err)

    }
}