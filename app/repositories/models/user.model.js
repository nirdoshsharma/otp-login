const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: String,
    lastLoggedIn: Date,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = { UserModel };
