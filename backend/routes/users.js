const express = require("express");
const { protect } = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

// GET /api/users
router.get("/", protect, async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }) // exclude self
      .select("_id username")
      .sort({ username: 1 }); // sort alphabetically

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
