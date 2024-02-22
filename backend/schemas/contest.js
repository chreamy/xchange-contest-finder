//example with Mongo DB

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contestSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  address: String,
  coordinates: {
    type: [Number],
    validate: {
      validator: function (coordinates) {
        return coordinates.length === 2;
      },
      message:
        "Coordinates must be an array of two numbers [longitude, latitude]",
    },
  },
  media: [String], //array of media links
  tags: [String], //major, school, and other tags to sort contests
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved", "rejected", "archived"],
    default: "pending",
  },
});

const Contest = mongoose.model("Contests", contestSchema);

module.exports = Contest;
