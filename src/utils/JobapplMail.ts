const verificationTemplate = require("./jobTemp");
const mailer = require("nodemailer");
const req = require("express/lib/request");
require("dotenv").config();

const sendEmail = async (options) => {
  const transporter = mailer.createTransport({
    host: process.env.SMTP_HOST,
    service: "gmail",
    port: "587",
    // starttls: {
    //   enable: true,
    // },
    // secureConnection: true,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // To prevent issues with self-signed certificates
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

exports.sendEmail = async (Email_Address, Full_Name, Job_title) => {
  var date = new Date();
  // ipAddress = req.headers['x-forwarded-for'] || req.ip;
  // call sendEmail
  await sendEmail({
    email: Email_Address,

    subject:
      "4 Pillars Infotech India Pvt Ltd - Thank you for your application",
    html: verificationTemplate.verificationEmailTemplate(
      Email_Address,
      Full_Name,
      Job_title
    ),
  });
};

// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: "",
//         secure: true,
//         auth: {
//             user: process.env.SMTP_EMAIL,
//             pass: process.env.SMTP_PASSWORD,
//         }
//     });

//     const message = {
//         from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//         html: options.html,
//     };
//     await transporter.sendMail(message);
// };

// module.exports = sendEmail;
