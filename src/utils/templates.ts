const cssStyle = `<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.box {
  margin: 5px 5px;
}
.heading {
  margin-left: 10px;
  font-weight: bold;
  text-decoration: underline;
}
.details {
  margin: 25px 40px;
  padding: 5px 10px;
}
.greeting {
  font-weight: bold;
  font-family: "Noto Sans", sans-serif;
  font-size: large;
}
.greetingWillinker {
  margin-top: 10px;
  font-size: large;
}
.salutaion {
  margin-top: 10px;
  font-weight: bold;
  
  font-family: "Noto Sans", sans-serif;
  font-size: medium;
}
.checkLink {
  margin-top: 10px;
  font-weight: bold;
  font-family: "Lato", sans-serif;
  font-size: large;
}
.linkVerify {
  margin-top: 10px;
  font-weight: bold;
  font-family: "Noto Sans", sans-serif;
  font-size: medium;
}
.linkVerify a {
  margin-top: 10px;
  font-weight: bolder;
  font-style: italic;
  font-family: "Roboto", sans-serif;
  font-size: large;
}
.textBody {
  margin-top: 10px;
  font-style: italic;
  font-family: "Source Sans Pro", sans-serif;
  font-size: large;
}
.wish {
  margin-top: 10px;
  font-size: large;
}
.companyName {
  font-size: large;
  font-weight: bolder;
  text-align: center;
}
.alertMessage {
  margin-top: 10px;
 
  font-family: "Noto Sans", sans-serif;
  font-size: medium;
  font-weight: bold;
}
.textBody2 {
  margin-top: 10px;
  font-style: italic;
  font-family: "Source Sans Pro", sans-serif;
  font-size: large;
  
  font-weight: bold;
}
.emailLink a {
  font-family: "Roboto", sans-serif;
  font-size: medium;
  font-style: italic;
  font-weight: bolder;
}
.phoneCall,
.link2 a {
  font-family: "Roboto", sans-serif;
  font-size: medium;
  font-style: italic;
  font-weight: bolder;
}
.blue-text{
  color: dodgerblue;
}
</style>`;


// exports.verificationEmailTemplate = (name, email,otp) => {
//   const template = `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <!-- <link rel="stylesheet" href="index.css" /> -->
//     <link
//       href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&display=swap"
//       rel="stylesheet"
//     />
//     <link
//       href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&family=Source+Sans+Pro:ital@1&display=swap"
//       rel="stylesheet"
//     />
//     ${cssStyle}
//   </head>
//   <body>
//      <div>
//       <h3>Dear ${name} your otp is send for email-verification on ${email} is ${otp}....</h3>
//      </div>
//      <br>
//      <br>
//       <footer><h4>Thanks and Regards 4 Pillars Infotech India Pvt Ltd </h4></footer>
//   </body>
// </html>
// `;
//   return template;
// };






// exports.registrationEmailTemplate = (name, email) => {
//   const template = `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <!-- <link rel="stylesheet" href="index.css" /> -->
//     <link
//       href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&display=swap"
//       rel="stylesheet"
//     />
//     <link
//       href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&family=Source+Sans+Pro:ital@1&display=swap"
//       rel="stylesheet"
//     />
//     ${cssStyle}
//   </head>
//   <body>
//      <div>
//       <h3>Dear ${name} you have successfully register your email which is ${email} ....</h3>
//      </div>
//      <br>
//      <br>
//       <footer><h4>Thanks and Regards 4 Pillars Infotech India Pvt Ltd </h4></footer>
//   </body>
// </html>
// `;
//   return template;
// };

exports.verificationEmailTemplate = (name, email, otp) => {
  const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&family=Source+Sans+Pro:ital@1&display=swap" rel="stylesheet" />
    <style>
      body {
        font-family: 'Lato', 'Noto Sans', 'Roboto', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      h3 {
        color: #333;
        font-size: 18px;
      }
      p {
        font-size: 16px;
        color: #555;
      }
      .otp-box {
        font-size: 20px;
        font-weight: bold;
        color: #d32f2f;
        background: #f8d7da;
        padding: 10px;
        display: inline-block;
        border-radius: 5px;
        margin-top: 10px;
      }
      footer {
        margin-top: 20px;
        padding-top: 10px;
        border-top: 1px solid #ddd;
        text-align: center;
        font-size: 14px;
        color: #555;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h3>Dear ${name},</h3>
      <p>Your One-Time Password (OTP) for email verification is:</p>
      <div class="otp-box">${otp}</div>
      <p>Please use this OTP to complete your email verification process.</p>
      <br>
      <footer>
        <h4>Thanks and Regards, <br> 4 Pillars Infotech India Pvt Ltd</h4>
      </footer>
    </div>
  </body>
</html>`;
  
  return template;
};


exports.registrationEmailTemplate = (name, email) => {
  const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Confirmation</title>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&family=Source+Sans+Pro:ital@1&display=swap" rel="stylesheet" />
    <style>
      body {
        font-family: 'Lato', 'Noto Sans', 'Roboto', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      h3 {
        color: #333;
        font-size: 18px;
      }
      footer {
        margin-top: 20px;
        padding-top: 10px;
        border-top: 1px solid #ddd;
        text-align: center;
        font-size: 14px;
        color: #555;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h3>Dear ${name},</h3>
      <p>You have successfully registered your email: <strong>${email}</strong>.</p>
      <p>Welcome to 4 Pillars Infotech India Pvt Ltd! We are excited to have you onboard.</p>
      <br>
      <footer>
        <h4>Thanks and Regards, <br> 4 Pillars Infotech India Pvt Ltd</h4>
      </footer>
    </div>
  </body>
</html>`;
  
  return template;
};



exports.forgotPasswordEmailTemplate = ( email, otp) => {
  const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgot Password OTP</title>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&family=Source+Sans+Pro:ital@1&display=swap" rel="stylesheet" />
    <style>
      body {
        font-family: 'Lato', 'Noto Sans', 'Roboto', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      h3 {
        color: #333;
        font-size: 18px;
      }
      p {
        font-size: 16px;
        color: #555;
      }
      .otp-box {
        font-size: 20px;
        font-weight: bold;
        color: #d32f2f;
        background: #f8d7da;
        padding: 10px;
        display: inline-block;
        border-radius: 5px;
        margin-top: 10px;
      }
      footer {
        margin-top: 20px;
        padding-top: 10px;
        border-top: 1px solid #ddd;
        text-align: center;
        font-size: 14px;
        color: #555;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h3>Dear ,</h3>
      <p>We received a request to reset your password. Your One-Time Password (OTP) for password reset is:</p>
      <div class="otp-box">${otp}</div>
      <p>Please use this OTP to reset your password. If you did not request a password reset, please ignore this email.</p>
      <br>
      <footer>
        <h4>Thanks and Regards, <br> 4 Pillars Infotech India Pvt Ltd</h4>
      </footer>
    </div>
  </body>
</html>`;
  
  return template;
};




exports.sendforgotPasswordEmailTemplate = (email, tempPassword) => {
	const template = `<!DOCTYPE html>
  <html lang="en">
	<head>
	  <meta charset="UTF-8" />
	  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	  <title>Forgot Password</title>
	  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&display=swap" rel="stylesheet" />
	  <style>
		body {
		  font-family: 'Lato', 'Noto Sans', 'Roboto', sans-serif;
		  background-color: #f4f4f4;
		  margin: 0;
		  padding: 0;
		}
		.container {
		  max-width: 600px;
		  margin: 30px auto;
		  background: #ffffff;
		  padding: 20px;
		  border-radius: 8px;
		  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		}
		h3 {
		  color: #333;
		  font-size: 18px;
		}
		p {
		  font-size: 16px;
		  color: #555;
		}
		.password-box {
		  font-size: 20px;
		  font-weight: bold;
		  color: #d32f2f;
		  background: #f8d7da;
		  padding: 10px;
		  display: inline-block;
		  border-radius: 5px;
		  margin-top: 10px;
		}
		footer {
		  margin-top: 20px;
		  padding-top: 10px;
		  border-top: 1px solid #ddd;
		  text-align: center;
		  font-size: 14px;
		  color: #555;
		}
	  </style>
	</head>
	<body>
	  <div class="container">
		<h3>Dear User,</h3>
		<p>Your Original  password for your account. Please use the password below to login.</p>
		<div class="password-box">${tempPassword}</div>
		<p>If you did not request this, please contact our support team immediately.</p>
		<br>
		<footer>
		  <h4>Thanks and Regards, <br> 4 Pillars Infotech India Pvt Ltd</h4>
		</footer>
	  </div>
	</body>
  </html>`;
	
	return template;
  };

  exports.sendAdminGeneratedPasswordEmail = (email,fullname, tempPassword) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Account Created - Your Login Credentials</title>
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&display=swap" rel="stylesheet" />
      <style>
        body {
          font-family: 'Lato', 'Noto Sans', 'Roboto', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 30px auto;
          background: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h3 {
          color: #333;
          font-size: 18px;
        }
        p {
          font-size: 16px;
          color: #555;
        }
        .password-box {
          font-size: 20px;
          font-weight: bold;
          color: #d32f2f;
          background: #f8d7da;
          padding: 10px;
          display: inline-block;
          border-radius: 5px;
          margin-top: 10px;
        }
        .login-button {
          display: inline-block;
          background-color: #007bff;
          color: #ffffff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 15px;
        }
        footer {
          margin-top: 20px;
          padding-top: 10px;
          border-top: 1px solid #ddd;
          text-align: center;
          font-size: 14px;
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h3>Dear  ${fullname},</h3>
        <p>Your account has been successfully created by the admin. Below are your login credentials:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Temporary Password:</strong> <span class="password-box">${tempPassword}</span></p>
        <p>Please log in using the Password and Email  and also change your password  for security reasons.</p>
        <br>
        <footer>
          <h4>Thanks and Regards, <br> 4 Pillars Infotech India Pvt Ltd</h4>
        </footer>
      </div>
    </body>
    </html>`;
  };

