const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const incidentRoutes = require('./routes/incidentRoutes');


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors({
  origin: "*", // OR specify your frontend URL like: "https://cyberguard-frontend.vercel.app"
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));
app.use(express.json());

// Routes
app.use('/api', incidentRoutes);
app.use("/api/reports", require("./routes/reports"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/moderation", require("./routes/moderation"));
app.use("/api/escalation", require("./routes/escalation"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});
// Handle general errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});
// Export the app for testing
module.exports = app;
