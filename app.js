const express =require('express');
const app = express();
const mongoose=require('mongoose');
const config=require("./utils/config");
const cors = require('cors');
const usersRouter= require('./controllers/users');
const loginRouter=require('./controllers/login');
const passwordRequestRouter = require('./controllers/passwordRequest');
const UpdatepasswordRouter= require('./controllers/ResetPassword')

mongoose.set('strictQuery',false);

mongoose.connect(config.MONGODB_URI)
.then(()=>{
    console.log("connected to mongodb");
}).catch((error)=>{
    console.log("Error connecting to MongoDB database",error);
});

app.use(cors());
app.use(express.json());

app.use('/api/users',usersRouter);
app.use('/api/login',loginRouter);
app.use('/api/passwordRequest',passwordRequestRouter);
app.use('/api/PasswordReset',UpdatepasswordRouter)


module.exports = app