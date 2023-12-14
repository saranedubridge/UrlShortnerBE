const passwordResetRouter=require('express').Router();
const User = require('../models/user');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');




// Request Passwoed reset

passwordResetRouter.post('/',async(request,response)=>{
    // getting email from the user in reqest.body
    const {email}=request.body;

    // generate a random token for password reset
    crypto.randomBytes(32,async(err,buffer)=>{
// handle errror in token generate
        if(err){
            response.status(500).send('Error generating token');
            return;
        }
        // else convert the generated buffer to hex string 
          const token = buffer.toString('hex');

        //   find the user by their email
          const user= await User.findOne({email:email});

        //   if no user is found , send an error response
        if(!user){
            return response.status(400).send('User not found')
        }
        // else set the passwoed reste token and expiration time
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now()+3600000;

        // Save the upadate user object the database
           await user.save();

        //    send email with the token
        const resetUrl = `http://localhost:5173/reset-password?token=${token}`;


    // configure Nodemailer with you email service
    let transporter=nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'saranraj.1803164@srec.ac.in',
        pass: 'tjar ofos xxzk oimh'
  }
});

    var mailOptions = {
        from: 'youremail@gmail.com',
        to: user.email,
        subject: 'Reset your password',
        text:`You requested a password reset. Please click on this link to reset your password: ${resetUrl}`,
        // html: `<p>You requested a password reset. Please click on this link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`
};

    transporter.sendMail(mailOptions, function(error, info){
         if (error) {
             console.log(error);
             response.status(500).send('Email not sent');
    }    
    else {
             response.status(200).send('Email sent successfully');
            
    }
    })
});
})

module.exports = passwordResetRouter;