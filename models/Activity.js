const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  website: String,
  title: String,
  timeSpent: Number,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);