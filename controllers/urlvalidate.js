const urlvalidate= require('express').Router();
const Url = require('../models/urlschema');
// const shortid = require('shortid');

urlvalidate.get('/:shortUrl', async (request, response) => {
    const { shortUrl } = request.params;

    try {
        // Find the URL in the database
        const url = await Url.findOne({ shortUrl });

        if (url) {
     // Increment the count
      url.count += 1;
      await url.save();
            // Redirect to the original URL
            return response.redirect(url.longUrl);
        } else {
            // If the URL is not found, send a 404 error
            return response.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error('Error redirecting to URL:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports=urlvalidate