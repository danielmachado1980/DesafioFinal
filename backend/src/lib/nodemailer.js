import mailConfig from '../config/mail';

const nodemailer = require('nodemailer');

const send = async (args) => {
  try {
    const {
      host, port, secure, auth,
    } = mailConfig;

    const { email, subject, body } = args;
    console.log(`Enviando email para...: ${email}`);

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth,
    });

    transporter.verify((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    const mailOptions = {
      from: 'Daniel Machado <danielgoncalves.machado@gmail.com>', // sender address
      to: email, // list of receivers
      subject, // Subject line
      html: body, // plain text body
    };


    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return console.log(`Error while sending mail: ${error}`);
      }
      //console.log('Message sent: %s', info.messageId);

      // transporter.close(); // shut down the connection pool, no more messages.
    });

    //console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log(nodemailer.getTestMessageUrl(info));
    return nodemailer.getTestMessageUrl('Message to');
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

module.exports = {
  send,
};
