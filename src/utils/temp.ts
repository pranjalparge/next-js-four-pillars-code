const cssStyle = `<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans", sans-serif;
  line-height: 1.6;
  color: #333;
  padding: 20px;
  background-color: #f9f9f9;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header img {
  max-width: 150px;
  height: auto;
  margin: 10px auto;
  display: block;
}

.greeting {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

.message {
  margin-top: 20px;
  font-size: 16px;
  color: #555;
}

.footer {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  color: #777;
}
</style>`;

exports.verificationEmailTemplate = (name, message) => {
  const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    <div class="container">
      
      <div class="greeting">
        Dear ${name}, thank you for contacting us.
      </div>
      <div class="message">
        ${message}
      </div>
      <div class="footer">
        <p>Thanks and Regards,</p>
        <p><strong>Four Pillars Infotech India Team</strong></p>
      </div>
    </div>
  </body>
</html>`;
  return template;
};
