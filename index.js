const mongoose = require("mongoose");
const { AppConfig } = require("./config/app.config");

const cors = require("cors");
const express = require("express");
const { AppRouter } = require("./server/routers/app.router");
const { AuthRouter } = require("./server/routers/auth.router");
const app = express();

const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/", AppRouter);
app.use("/auth", AuthRouter);

mongoose
  .connect(AppConfig.MONGODB_URI)
  .then(() => {
    console.log("[MongoDB] Connected!");
    app.listen(port, () => {
      console.log(`Server started at :${port}`);
    });
  })
  .catch((error) => {
    console.error(`[MongoDB] ${error.message}`);
  });

module.exports = app;
