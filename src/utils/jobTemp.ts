// src/utils/jobTemp.ts

// CSS styles for the email template
const cssStyle = `<style>
* {
  margin: 0;
  padding: 0;
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

// Function to generate the verification email template
export const verificationEmailTemplate = (
  Full_Name: string,
  Email_Address: string,
  Job_title: string,
  date: string
): string => {
  const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Google Fonts -->
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Noto+Sans&family=Roboto:ital,wght@1,300&family=Source+Sans+Pro:ital@1&display=swap"
      rel="stylesheet"
    />
    ${cssStyle}
  </head>
  <body>
     <div class="box">
      <h3 class="greeting">Dear ${Full_Name},</h3>
      <p class="textBody">
        Thank you for applying to the <strong>${Job_title}</strong> position at 4 Pillars Infotech India Pvt Ltd.
        We’d like to inform you that we have received your application. Our hiring team is currently reviewing all applications, and we plan to schedule interviews in the next weeks.
      </p>
      <p class="textBody">Applied on: ${date}</p>
      <p class="salutaion">Thanks and Regards,</p>
      <p class="companyName">4 Pillars Infotech India Pvt Ltd</p>
     </div>
  </body>
</html>`;
  return template;
};
