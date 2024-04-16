const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 

const form  = new Schema({
  userId: {
    type: String,
    required: true,
  },
  competitionType: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    default: Date.now(),
  },
  // Soft skills, list of skills
  softSkills: {
    type: [String],
    required: true
  },
  hardSkills: {
    type: [String],
    required: true
  },
  introduction: {
    type: String,
    required: false,
  },
});

const Form = mongoose.model("Form", form);
module.exports = Form;
