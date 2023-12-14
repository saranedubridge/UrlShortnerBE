const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt=require('bcrypt');
const config= require('../utils/config')
const jwt = require('jsonwebtoken');


loginRouter.post('/',async(request,response)=>{
    // get the crediantials from the request
const {email,password}=request.body;
    // check if the user exists with the username
const user = await User.findOne({email});
    // return error if the user does not exists

    if(!user){
        return response.status(401).json ({message:'User does not exists'});
    }

    // check if the passwoed is correct
  const isAuthenticated = await bcrypt.compare(password,user.passwordHash);
    // return error if the password is  incorrect 
  if(!isAuthenticated){
    return response.status(401).json({message:'password invalid'});
  }  

    // generate a token for the user and return it

    const payloadData={
        email:user.email,
        id:user._id
    }

    const token = jwt.sign(payloadData,config.SECRET,{expiresIn:3600});
    response.json({token:token,email:user.email,name: user.name});
})

module.exports=loginRouter;