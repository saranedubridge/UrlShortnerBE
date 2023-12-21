const usersRouter= require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const { sendActivationEmail } = require('../utils/emailActivation');


// to get all the users 

usersRouter.get('/',async(request,response)=>{
    const users = await User.find();

    response.json(users);
});



// Endpoint to create a new user
usersRouter.post('/', async (request, response) => {
    const { email, name, password } = request.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return response.status(400).json({ error: 'Email is already in use. Please choose a different email.' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate a unique activation token
    const activationToken = crypto.randomBytes(20).toString('hex');

    // Create a new user object with isActive set to false
    const user = new User({
        email,
        name,
        passwordHash,
        isActive: false, // User is inactive until they verify their email
        activationToken
    });

    // Save the new user
    await user.save();

    // Send activation email
    sendActivationEmail(email, activationToken);

    response.status(201).json({ message: 'Registration successful. Please check your email to activate your account.' });
});

// Endpoint to activate user account
usersRouter.post('/activate/:activationToken', async (request, response) => {
    const { activationToken } = request.params;
    const user = await User.findOne({ activationToken });

    if (!user) {
        return response.status(400).json({ error: 'Invalid or expired activation token.' });
    }

    user.isActive = true;
    user.activationToken = undefined; // Clear the token once used
    await user.save();

    response.json({ message: 'Account activated successfully.' });
});



module.exports = usersRouter;