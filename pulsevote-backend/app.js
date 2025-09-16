// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// Security and parsing
app.use(helmet());
app.use(cors({
  origin: "https://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('PulseVote API running!');
});

app.use("/api/auth", authRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
    timestamp: new Date()
  });
});

module.exports = app;
