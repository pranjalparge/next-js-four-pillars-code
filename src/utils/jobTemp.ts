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


exports.verificationEmailTemplate = (Full_Name,Email_Address ,Job_title,date) => {
  const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- <link rel="stylesheet" href="index.css" /> -->
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
     <div>
      <h3>Dear ,Thank you for applying to the ${Job_title} position at  4 Pillars Infotech India Pvt Ltd I’d like to inform you that we received your application , Our hiring team is currently reviewing all applications and we are planning to schedule interviews in the next weeks.</h3>
     </div>
     <br>
     <br>
      <footer><h4>Thanks and Regards 4 Pillars Infotech India Pvt Ltd</h4></footer>
  </body>
</html>
`;
  return template;
};