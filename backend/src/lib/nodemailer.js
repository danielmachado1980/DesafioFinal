import mailConfig from '../config/mail';

const nodemailer = require('nodemailer');

const send = async args => {
  try {
    const { host, port, secure, auth, from } = mailConfig;

    const { email, subject, body } = args;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host, // Gmail Host
      port, // Port
      secure, // this is true as port is 465
      auth,
    });

    const mailOptions = {
      from, // sender address
      to: email, // list of receivers
      subject, // Subject line
      html: body, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Error while sending mail: ${error}`);
      }
      console.log('Message sent: %s', info.messageId);
    });

    return true;

    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

module.exports = {
  send,
};
