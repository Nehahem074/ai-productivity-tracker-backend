const express = require("express");
const Activity = require("../models/Activity");
const OpenAI = require("openai");

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/analyze", async (req, res) => {
  try {
    const activities = await Activity.find().limit(20);

    const text = activities.map((a) =>
      `${a.website} for ${a.timeSpent} seconds`
    ).join("\n");

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `Analyze this productivity data:\n${text}`,
        },
      ],
    });

    res.json({
      analysis: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;