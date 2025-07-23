const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const incidentRoutes = require('./routes/incidentRoutes');


// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', incidentRoutes);
app.use("/api/reports", require("./routes/reports"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/moderation", require("./routes/moderation"));
app.use("/api/escalation", require("./routes/escalation"));

// 404 handler (keep after routes)
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

// Error handler (final fallback)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

module.exports = app;
