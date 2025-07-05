const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function issueToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username }, // include username for convenience
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// POST /api/auth/register
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (
      !username ||
      typeof username !== "string" ||
      username.trim().length < 3
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Username must be at least 3 characters",
        });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters",
        });
    }

    if (await User.exists({ username: username.trim() })) {
      return res
        .status(409)
        .json({ success: false, message: "Username already taken" });
    }

    const user = await User.create({ username: username.trim(), password });
    res.status(201).json({
      success: true,
      token: issueToken(user),
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Username & password required" });
    }

    const user = await User.findOne({ username: username.trim() });
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      token: issueToken(user),
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: { id: req.user._id, username: req.user.username },
  });
});

module.exports = router;
