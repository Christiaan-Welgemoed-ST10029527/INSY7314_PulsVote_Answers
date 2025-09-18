// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Security and parsing middleware
app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173", // Changed to HTTP
  credentials: true
}));
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');

// Routes
app.get('/', (req, res) => {
  res.send('PulseVote API running!');
});

app.use("/api/auth", authRoutes);

app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
    timestamp: new Date()
  });
});

module.exports = app;