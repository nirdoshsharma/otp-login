const express = require("express");
const app = require("../../package.json");
const { AuthController } = require("../controllers/auth.controller");
const { AuthMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/otp/request", AuthController.requestOTP);

router.post("/otp/verify", AuthController.verifyOTP);

router.get("/me", AuthMiddleware.verifyJWT, AuthController.getMe);

module.exports = { AuthRouter: router };
