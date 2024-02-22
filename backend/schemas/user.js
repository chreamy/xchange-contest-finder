const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  email: String,
  name: String,
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
