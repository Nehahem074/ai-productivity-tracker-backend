const express = require("express");
const Activity = require("../models/Activity");

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { website, title, timeSpent } = req.body;

    const activity = new Activity({
      website,
      title,
      timeSpent,
    });

    await activity.save();

    res.status(201).json({ message: "Activity Saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;