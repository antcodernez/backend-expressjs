const nodemailer = require("nodemailer");
const {config} = require("./config/config");

//Servidor de envio de correos
const transport = nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  auth: {
    user: config.emailTrapUser,
    pass: config.emailTrapPass
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transport.sendMail({
    from: '"Calando esto" <marshday5@gmail.com>', // sender address
    to: "jesusa2813@gmail.com", // list of receivers
    subject: "Hola alv", // Subject line(asunto)
    text: "Soy un correo de la app de tiendas xd", // plain text body
    html: "<b>Correo enviado desde la api :D <br/> Soy el jefe</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

sendMail();
