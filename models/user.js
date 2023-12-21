const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    email:String,
    name:String,
    passwordHash:String,
    isActive: { type: Boolean, default: false }, // New field to track if the account is activated
    activationToken: String,
    passwordResetToken:String,
    passwordResetExpires:Date

})

const User = mongoose.model('User',userSchema,'users')

module.exports = User;