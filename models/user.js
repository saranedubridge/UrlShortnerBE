const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    email:String,
    name:String,
    passwordHash:String,
    passwordResetToken:String,
    passwordResetExpires:Date
})

const User = mongoose.model('User',userSchema,'users')

module.exports = User;