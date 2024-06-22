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
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Contest",
    default: [],
  },
  chatUsers:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  notice:{
    type:[String],
    default:[]
  },
  identity: {
    type: String,
    default: "Unknown",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
