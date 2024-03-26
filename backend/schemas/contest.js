//example with Mongo DB

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contestSchema = new Schema({
  _hashId: String,
  title: String,
  link: String,
  startDate: Date,
  endDate: Date,
  organizer: String,
  agency: String,
  contactPhone: String,
  contactEmail: String,
  location: String,
  tags: [String],
  coverImg: String,
  detail: String,
  totalPrize: String,
  maxPrize: String,
  ageGroup: String,
  nationality: String,
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true },
  status: {
    type: String,
    required: true,
    enum: ["visible", "hidden"],
    default: "visible",
  },
});

const Contest = mongoose.model("Contests", contestSchema);

module.exports = Contest;
