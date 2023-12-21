const urlRouter= require('express').Router();
const shortid = require('shortid');
const Url = require('../models/urlschema');


urlRouter.post('/',async(request,response)=>{

    
    const {longUrl}=request.body;
    console.log(longUrl)

    try{
        //   generate a unique shortID
    const shortUrl=shortid.generate();

   
    // Create a new URl document
  
    const url = new Url({
        longUrl,
        shortUrl,
    });

// save url in mongodb database
    await url.save();

    response.json({shortUrl});

    
        
    }catch(error){
        console.error('Error shortening URL:',error);
        response.status(500).json({error:'Internal Server Error'})

    }
});



module.exports = urlRouter;