const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "qknuetkp64wo6kq5@ethereal.email", // generated ethereal user
      pass: "w1N1nRKTa58ZzggbSS", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false, // avoid NodeJs self signed certificate error
    },
  });

  const info = await transporter.sendMail({
    from: `Anhtudo from Dreamera ${process.env.SENDER_EMAIL}`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = sendEmail;
