const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = (user) => {
    const msg = {
        to: user.email,
        from: 'hudanico@gmail.com',
        subject: 'Welcome :)',
        text: `Welcome on EasyCount ${user.firstName} ${user.lastName} !`
    }
    
    sendgrid.send(msg);
};

    module.exports = {
        sendWelcomeMail
    }
