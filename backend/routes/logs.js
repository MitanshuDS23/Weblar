const express = require("express");
const ActionLog = require("../models/ActionLog");
const { protect } = require("../middleware/auth");
const router = express.Router();

// GET /api/logs
router.get("/", protect, async (req, res, next) => {
  try {
    const logs = await ActionLog.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("user", "username")
      .populate("task", "title");
    res.json(logs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
