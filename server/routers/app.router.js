const express = require("express");
const app = require("../../package.json");

const router = express.Router();

router.get("/", (req, res) =>
  res.send({ error: 0, message: `${app.name} - ${app.version}` })
);

module.exports = { AppRouter: router };
