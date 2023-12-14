const usersRouter= require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')


// to get all the users 

usersRouter.get('/',async(request,response)=>{
    const users = await User.find();

    response.json(users);
});



// to create a new user

usersRouter.post('/',async(request,response)=>{
     const {email,name,password}=request.body;

     const passwordHash=await bcrypt.hash(password,10)

    //  create a new user object

    const user= new User({
        email,
        name,
        passwordHash
    })

 const savedUser = await user.save();
 response.json(savedUser);

})

module.exports=usersRouter;