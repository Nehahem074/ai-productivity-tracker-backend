const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");
const aiRoutes = require("./routes/aiRoutes");
require("dotenv").config();

const app = express();

const limiter = rateLimit({
  windowMS: 15*60*1000,
  max: 100,
  message:"TOO many Requests from this IP",
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use("/api/auth",authRoutes);
app.use("/api/activity",activityRoutes);
app.use("/api/ai",aiRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});