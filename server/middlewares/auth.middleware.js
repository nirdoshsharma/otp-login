const jwt = require("jsonwebtoken");
const { AppConfig } = require("../../config/app.config");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, AppConfig.LOGIN_JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 1, message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 1, message: "Missing Auth Token" });
  }
};

const AuthMiddleware = { verifyJWT };
module.exports = { AuthMiddleware };
