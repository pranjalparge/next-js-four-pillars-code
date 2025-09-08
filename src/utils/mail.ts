// const verificationTemplate = require("./temp");
// const mailer = require("nodemailer");
// const req = require("express/lib/request");
// require("dotenv").config();

// const sendEmail = async (options) => {
//   const transporter = mailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "fourpillarsinfotech@gmail.com",
//       pass: "xsfenkeswmjoiexc",
//     },
//     debug: true,
//     logger: true,
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const message = {
//     from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     html: options.html,
//   };
//   const result = transporter.sendMail(message, (error, info) => {
//     if (error) {
//       return console.error("Error:", error);
//     }
//     console.log("Email sent:", info.response);
//   });
// };

// module.exports.sendEmail = async (email, name, subject, message) => {
//   await sendEmail({
//     email: email,
//     subject: subject,
//     html: verificationTemplate.verificationEmailTemplate(name, message),
//   });
// };
const { SendMailClient } = require("zeptomail");
const { verificationEmailTemplate } =require("./temp");
const verificationTemplate = require("./templates");
require("dotenv").config();

const url = "https://api.zeptomail.in/";
const token = "Zoho-enczapikey PHtE6r1YEbu5jTUnpBEC56WxQJLyYYsp9e4xJQlC491CCKQCS01WrNB5mje1+hooVfBGQaOfzN5ptrOVu+yAIju+PGdFWGqyqK3sx/VYSPOZsbq6x00YsFgSdEzfVo/net5o0CPRvd7eNA==";

const client = new SendMailClient({ url, token });

const sendemail = async ({ email, name, subject, message }) => {
  try {
    const emailData = {
      from: {
        address: "noreply@99ideas.in",
        name: "noreply",
      },
      to: [
        {
          email_address: {
            address: email,
            name: name,
          },
        },
      ],
      subject: subject,
      htmlbody: verificationEmailTemplate(name, message),
    };

    const response = await client.sendMail(emailData);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


const registartionMail = async ({ email, name, subject }) => {
  try {
    const emailData = {
      from: {
        address: "noreply@99ideas.in",
        name: "noreply",
      },
      to: [
        {
          email_address: {
            address: email,
            name: name,
          },
        },
      ],
      subject: subject,
      htmlbody: verificationTemplate.registrationEmailTemplate(name, email),
    };

    const response = await client.sendMail(emailData);
    console.log("Email sent successfully:", response);
    return response
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


const otpMail = async ({ email, name,otp,subject }) => {
  try {
    const emailData = {
      from: {
        address: "noreply@99ideas.in",
        name: "noreply",
      },
      to: [
        {
          email_address: {
            address: email,
            name: name,
          },
        },
      ],
      subject: subject,
      htmlbody: verificationTemplate.verificationEmailTemplate(name, email,otp),
    };

    const response = await client.sendMail(emailData);
    console.log("Email sent successfully:", response);
    return response
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const forgetPasswordEmail = async ({ email,otp,subject }) => {
  try {
    const emailData = {
      from: {
        address: "noreply@99ideas.in",
        name: "noreply",
      },
      to: [
        {
          email_address: {
            address: email,
          },
        },
      ],
      subject: subject,
      htmlbody: verificationTemplate.forgotPasswordEmailTemplate(email,otp),
    };

    const response = await client.sendMail(emailData);
    console.log("Email sent successfully:", response);
    return response
    // return response
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const CreateUserPasswordEmail = async ({ email,password,name,subject }) => {
  try {
    const emailData = {
      from: {
        address: "noreply@99ideas.in",
        name: "noreply",
      },
      to: [
        {
          email_address: {
            address: email,
            name: name,
          },
        },
      ],
      subject: subject,
      htmlbody: verificationTemplate.sendAdminGeneratedPasswordEmail(email,name,password),
    };

    const response = await client.sendMail(emailData);
    console.log("Email sent successfully:", response);
    return response
    // return response
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Exported function to use in other parts of the application
const sendEmail = async (email, name,subject, message) => {
  await sendemail({ email, name, subject, message });
};

const otpVerficationMail = async (email, name,otp,subject) => {
  return await otpMail({ email, name, otp,subject});
};

const registrailverifyMail = async (email, name,subject) => {
  return await registartionMail({ email, name,subject});
};

const forgetPassEmail = async (email, otp,subject) => {
  return await forgetPasswordEmail({ email,otp,subject});
};

const UserPasswordEmail = async (email, password,name,subject) => {
  
  
  return await CreateUserPasswordEmail({ email,password, name,subject});
};
module.exports = {sendEmail,otpVerficationMail,registrailverifyMail,forgetPassEmail,UserPasswordEmail}


