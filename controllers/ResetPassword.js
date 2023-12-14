
const passwordUpdateRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Define router
passwordUpdateRouter.post('/:token', async (request, response) => {
    // Extract the token from URL parameters
    const { token } = request.params;
    const { newpassword } = request.body;

    // Find the user matching reset token and token expires
    const user = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() }
    });

    // If no matching user is found, return an error response
    if (!user) {
        return response.status(400).send("Token is invalid or expired");
    }

    // Hash the password
    const saltRounds = 10;

    try {
        user.passwordHash = await bcrypt.hash(newpassword, saltRounds);
        console.log("New Password:", newpassword);
    } catch (error) {
        // Handle any potential errors when hashing
        return response.status(500).send("Error hashing password");
    }

    // Clear the password reset token and expiration data fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Save the updated user with the new hashed password
    await user.save();

    // Send the success response
    response.send('Your password has been updated');
})

module.exports = passwordUpdateRouter;
