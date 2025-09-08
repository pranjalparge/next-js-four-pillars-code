const verificationTemplate = require("./templates");
const mailer = require("nodemailer");
const req = require("express/lib/request");
require("dotenv").config();

const sendEmail = async (options) => {
  const transporter = mailer.createTransport({
    host: "smtp.example.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "fourpillarsinfotech@gmail.com",
      pass: "xsfenkeswmjoiexc",
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    // to: [options.email , 'fullstack1@4pillarsinfotechindia.com' , 'fullstack2@4pillarsinfotechindia.com' , 'abinashbasak129@gmail.com' , 'devasish2000@gmail.com'],
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };
  await transporter.sendMail(message);
};

module.exports.sendEmail = async (firstname, email,otp) => {
  var date = new Date();
  // ipAddress = req.headers['x-forwarded-for'] || req.ip;
  // call sendEmail
  await sendEmail({
    email: email,
    subject: "4 Pillars Infotech India Pvt Ltd - Account Confirmation Process",
    html: verificationTemplate.verificationEmailTemplate(
      firstname,
      email,
      otp
    ),
  });
};


module.exports.sendRegistrationEmail = async (firstname, email) => {
  var date = new Date();
  // ipAddress = req.headers['x-forwarded-for'] || req.ip;
  // call sendEmail
  await sendEmail({
    email: email,
    subject: "4 Pillars Infotech India Pvt Ltd",
    html: verificationTemplate.registrationEmailTemplate(
      firstname,
      email,
      date
    ),
  });
};


module.exports.sendForgotEmail = async (email,otp) => {
  var date = new Date();
  // ipAddress = req.headers['x-forwarded-for'] || req.ip;
  // call sendEmail
  await sendEmail({
    email: email,
    subject: "4 Pillars Infotech India Pvt Ltd - Account Confirmation Process",
    html: verificationTemplate.forgotPasswordEmailTemplate(
      email,
      otp
    ),
  });
};


module.exports.sendForgotPasswordEmail = async (email,otp) => {
  var date = new Date();
  // ipAddress = req.headers['x-forwarded-for'] || req.ip;
  // call sendEmail
  await sendEmail({
    email: email,
    subject: "4 Pillars Infotech India Pvt Ltd - Account Confirmation Process",
    html: verificationTemplate.sendforgotPasswordEmailTemplate(
      email,
      otp
    ),
  });
};

