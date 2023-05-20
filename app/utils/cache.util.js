const { AppConfig } = require("../../config/app.config");

const otpStore = {};
const lastOTPStore = {};
const triggerOTPCache = {};
const wrongOTPCache = {};

const getOTP = (email) => lastOTPStore[email];

const trackOTP = (email, otp) => {
  if (!otpStore[email]) {
    otpStore[email] = {};
  }
  otpStore[email][otp] = new Date();
  lastOTPStore[email] = otp;
  setTimeout(() => {
    delete otpStore[email][otp];
  }, AppConfig.OTP_VALIDITY_MS);
};

const trackTriggerOTP = (email) => {
  checkIfBlocked(email);
  if (!triggerOTPCache[email]) {
    triggerOTPCache[email] = { count: 1, lastTriggeredAt: new Date() };
    return;
  }
  const { count = 1, lastTriggeredAt = new Date() } = triggerOTPCache[email];
  const currentDate = new Date();
  if (
    currentDate.getTime() - lastTriggeredAt.getTime() <
    AppConfig.OTP_RESEND_BACKOFF_MS
  ) {
    const timeLeft =
      (AppConfig.OTP_RESEND_BACKOFF_MS -
        (currentDate.getTime() - lastTriggeredAt.getTime())) /
      1000;
    throw new Error(`Too Many Requests, Please try after ${timeLeft}`);
  }
  triggerOTPCache[email] = { count: count + 1, lastTriggeredAt: new Date() };
};

const trackWrongOTP = (email) => {
  if (!wrongOTPCache[email]) {
    wrongOTPCache[email] = { count: 1, lastUpdated: new Date() };
    return;
  }
  const { count = 1, lastUpdated = new Date() } = wrongOTPCache[email] || {};
  checkIfBlocked(email);
  wrongOTPCache[email] = { count: count + 1, lastUpdated: new Date() };
};

const resetWrongOTP = (email) => {
  wrongOTPCache[email] = { count: 1, lastUpdated: new Date() };
};

const checkIfBlocked = (email) => {
  const currentDate = new Date();
  const { count = 1, lastUpdated = new Date() } = wrongOTPCache[email] || {};
  if (count >= 5) {
    if (
      currentDate.getTime() - lastUpdated.getTime() <
      AppConfig.WRONG_OTP_LIMIT_EXCEEDED_BACKOFF_MS
    ) {
      const timeLeft =
        AppConfig.WRONG_OTP_LIMIT_EXCEEDED_BACKOFF_MS -
        (currentDate.getTime() - lastUpdated.getTime());
      throw new Error(`Too Many Requests, Please try after ${timeLeft}`);
    } else {
      return resetWrongOTP(email);
    }
  }
};

const CacheUtil = {
  getOTP,
  trackOTP,
  trackTriggerOTP,
  trackWrongOTP,
  resetWrongOTP,
};
module.exports = { CacheUtil };
