const nodemailer = require("nodemailer");
const { AppConfig } = require("../../config/app.config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AppConfig.GMAIL_USERNAME,
    pass: AppConfig.GMAIL_PASSWORD,
  },
  logger: true,
  debug: true,
});

const send = async (email, otp) => {
  const message = {
    from: "me.nirdoshsharma9@gmail.com",
    to: email,
    subject: `OTP for Login - ${otp}`,
    text: `OTP for Login - ${otp}`,
    html: `OTP for Login - ${otp}`,
  };

  const info = await transporter.sendMail(message);
  console.log("Message sent successfully as %s", info.messageId);
};
const MailUtil = { send };
module.exports = { MailUtil };
