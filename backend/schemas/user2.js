const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//make user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },

});

const User2 = mongoose.model("Users2", userSchema);

module.exports = User2;
