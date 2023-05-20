const AppConfig = {
  // OTP
  OTP_VALIDITY_MS: parseInt(process.env.OTP_VALIDITY_S || "300") * 1000,
  OTP_RESEND_BACKOFF_MS:
    parseInt(process.env.OTP_RESEND_BACKOFF_S || "60") * 1000,
  WRONG_OTP_VERIFY_LIMIT: parseInt(process.env.WRONG_OTP_VERIFY_LIMIT || "5"),
  WRONG_OTP_LIMIT_EXCEEDED_BACKOFF_MS:
    parseInt(process.env.WRONG_OTP_LIMIT_EXCEEDED_BACKOFF_S || "3600") * 1000,
  // AUTH
  LOGIN_JWT_SECRET: process.env.LOGIN_JWT_SECRET || "dev.nirdosh",
  // MONGODB
  MONGODB_URI: process.env.MONGODB_URI || "",
  // NODE MAILER
  GMAIL_USERNAME: process.env.GMAIL_USERNAME || "",
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || "",
};
module.exports = { AppConfig };
