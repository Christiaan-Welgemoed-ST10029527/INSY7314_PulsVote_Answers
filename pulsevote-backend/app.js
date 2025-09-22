// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(helmet());//(expressjs, 2025)
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');

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
/*References
expressjs, 2025. Production Best Practices: Security. [Online] 
Available at: https://expressjs.com/en/advanced/best-practice-security.html
[Accessed 20 September 2025].


*/