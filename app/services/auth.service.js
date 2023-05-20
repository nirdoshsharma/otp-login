const { AppConfig } = require("../../config/app.config");
const { CacheUtil } = require("../utils/cache.util");
const jwt = require("jsonwebtoken");
const { MailUtil } = require("../utils/mail.util");
const { UserRespository } = require("../repositories/user.repository");

const triggerOTP = (email) => {
  CacheUtil.trackTriggerOTP(email);
  const otp = Math.floor(Math.random() * (9999 - 1111 + 1) + 1111);
  CacheUtil.trackOTP(email, otp);
  return MailUtil.send(email, otp)
    .then(() => {
      return { otp };
    })
    .catch((error) => {
      console.error(`[MailUtil][failed] ${error.message}`);
      throw error;
    });
};

const verifyOTP = (email, otp) => {
  const triggeredOTP = CacheUtil.getOTP(email);
  if (!triggeredOTP) {
    throw new Error("Invalid Request");
  }
  console.log(`[verifyOTP]${email} - ${otp} - ${triggeredOTP}`);
  if (otp != triggeredOTP) {
    CacheUtil.trackWrongOTP(email);
    throw new Error("Invalid OTP");
  }
  CacheUtil.resetWrongOTP(email);

  return UserRespository.findOrCreate(email)
    .catch((error) =>
      console.error(`[UserRespository][error] ${error.message}`)
    )
    .then((user) => {
      const token = jwt.sign(JSON.stringify(user), AppConfig.LOGIN_JWT_SECRET);
      return { token };
    });
};

const AuthService = { triggerOTP, verifyOTP };
module.exports = { AuthService };
