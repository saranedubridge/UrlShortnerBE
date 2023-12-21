
const nodemailer = require('nodemailer');

// Configure Nodemailer with your email service
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saranraj.1803164@srec.ac.in', 
        pass: 'tjar ofos xxzk oimh'          
    }
});

const sendActivationEmail = (userEmail, activationToken) => {
    const activationUrl = `https://quiet-scone-9288cf.netlify.app/activate/${activationToken}`;

    let mailOptions = {
        from: 'saranraj.1803164@srec.ac.in', 
        to: userEmail, 
        subject: 'Activate your account',
        text: `Please click on this link to activate your account: ${activationUrl}`,
      
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            // Handle error response
        } else {
            console.log('Activation email sent: ' + info.response);
            // Handle success response
        }
    });
};

module.exports = { sendActivationEmail };
