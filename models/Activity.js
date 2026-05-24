const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  website: String,
  title: String,
  timeSpent: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);