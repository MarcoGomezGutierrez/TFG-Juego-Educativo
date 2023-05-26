const transporter = require("../config/mailer.js");

const verificationLink = "https://192.168.0.11:443/";

async function send() {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"Verifiación del Email 👻" <marco.gomez@alumnos.uneatlantico.es>', // sender address
      to: "marcogomezgutierrez@gmail.com", // list of receivers
      subject: "Verificación del Email ✔", // Subject line
      html: `
      <h1 style="color: #333; font-family: Arial;">Primary Verificación ✔</h1>
      <p style="font-size: 16px; line-height: 1.5;">Por favor, si has sido tu quien has registrado este correo en Primary haga click en: Verificar mi cuenta</p>
      <div style="background-color: #f2f2f2; padding: 10px;">
        <a href="${verificationLink}" style="font-style: italic;">Verificar mi cuenta</a>
      </div>
            `,
    });
  } catch (err) {
    console.log(err);
    return res.status(501).send({
      msg: "Email no valido",
      email: false,
    });
  }
}

send();
