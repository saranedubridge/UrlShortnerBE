const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
        return response.status(401).json({ message: 'User does not exist' });
    }

    // Check if the user's account is activated
    if (!user.isActive) {
        return response.status(401).json({ message: 'Account is not activated. Please check your email to activate your account.' });
    }

    const isAuthenticated = await bcrypt.compare(password, user.passwordHash);
    if (!isAuthenticated) {
        return response.status(401).json({ message: 'Invalid password' });
    }

    const payloadData = {
        email: user.email,
        id: user._id
    };

    const token = jwt.sign(payloadData, config.SECRET, { expiresIn: 3600 });
    response.json({ token: token, email: user.email, name: user.name });
});

module.exports = loginRouter;
