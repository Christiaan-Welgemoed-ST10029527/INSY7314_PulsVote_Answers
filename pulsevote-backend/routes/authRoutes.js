// routes/authRoutes.js
const express = require("express");
const { body } = require("express-validator");
const { register, login, getProfile } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Validation middleware
const emailValidator = body("email")
  .isEmail().withMessage("Email must be valid")
  .normalizeEmail();

const passwordValidator = body("password")
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
  .matches(/[A-Za-z]/).withMessage("Password must include a letter")
  .matches(/\d/).withMessage("Password must include a number")
  .trim().escape();

// Routes with validation
router.post("/register", [emailValidator, passwordValidator], register);
router.post("/login", [emailValidator, body("password").notEmpty().trim().escape()], login);

// Protected route for getting user profile
router.get("/profile", authenticateToken, getProfile);

module.exports = router;