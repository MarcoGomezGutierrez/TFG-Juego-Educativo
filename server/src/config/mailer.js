const nodemailer = require("nodemailer");
require("dotenv").config();
const EMAIL = process.env.EMAIL || "marco.gomez@alumnos.uneatlantico.es";
const PASS_EMAIL = process.env.PASS_EMAIL || "apxbkmwqsteyyosv";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL, // generated ethereal user
    pass: PASS_EMAIL, // generated ethereal password
  },
});

module.exports = transporter;

transporter.verify().then(() => {
  console.log("Ready for send emails");
});
