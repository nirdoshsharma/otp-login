const { AuthService } = require("../../app/services/auth.service");

const requestOTP = async (req, res) => {
  const { body: { email } = {} } = req;
  if (!email) {
    return res.send({ error: 1, message: "`email` required" });
  }
  try {
    await AuthService.triggerOTP(email);
    res.send({ error: 0, message: "OTP Sent Successfully" });
  } catch (error) {
    return res.send({ error: 1, message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { body: { email, otp } = {} } = req;
  if (!email) {
    return res.send({ error: 1, message: "`email` required" });
  }
  if (!otp) {
    return res.send({ error: 1, message: "`otp` required" });
  }
  try {
    const { token } = await AuthService.verifyOTP(email, otp);
    res.send({ error: 0, message: "Login Success", token });
  } catch (error) {
    return res.send({ error: 1, message: error.message });
  }
};

const getMe = (req, res) => {
  const { user = {} } = req;
  return res.send({ error: 0, message: "Success", user });
};

const AuthController = { requestOTP, verifyOTP, getMe };
module.exports = { AuthController };
