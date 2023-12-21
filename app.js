const express =require('express');
const app = express();
const mongoose=require('mongoose');
const config=require("./utils/config");
const cors = require('cors');
const usersRouter= require('./controllers/users');
const loginRouter=require('./controllers/login');
const passwordRequestRouter = require('./controllers/passwordRequest');
const UpdatepasswordRouter= require('./controllers/ResetPassword');
const urlRouter=require('./controllers/url');
const urlvalidate=require('./controllers/urlvalidate');
const urlStats=require('./controllers/urlStats');
const urlTable = require('./controllers/urlTable');



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
app.use('/api/PasswordReset',UpdatepasswordRouter);
app.use('/api/url',urlRouter);
app.use('/',urlvalidate);
app.use('/api/stats', urlStats);
app.use('/api/table', urlTable);



module.exports = app;