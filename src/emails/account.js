const sendgrid = require('@sendgrid/mail')
const sendgridAPIkey = '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'
sendgrid.setApiKey(sendgridAPIkey);

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
