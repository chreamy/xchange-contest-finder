const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: false,
  },
  email: String,
  name: String,
  username: {
    type: String,
    required: false,
    minLength: 3,
  },
  password: {
    type: String,
    required: false,
    minLength: 6,
  },
  chatUsers:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
