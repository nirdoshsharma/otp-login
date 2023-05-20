const { UserModel } = require("./models/user.model");

const findOrCreate = (email) => {
  return UserModel.findOneAndUpdate(
    { email },
    { $set: { lastLoggedIn: new Date() } },
    { new: true, upsert: true }
  );
};
const UserRespository = { findOrCreate };
module.exports = { UserRespository };
