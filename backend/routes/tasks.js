const express = require("express");
const Task = require("../models/Task");
const ActionLog = require("../models/ActionLog");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const router = express.Router();

// helper to log actions
async function log(user, task, action, payload) {
  await ActionLog.create({ user, task, action, payload });
}

// GET /api/tasks
router.get("/", protect, async (req, res, next) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "username").lean();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks
router.post("/", protect, async (req, res, next) => {
  try {
    const { title, description, status, assignedTo } = req.body;
    if (!title || !description || !status) {
      return res
        .status(400)
        .json({ message: "Title, description, and status are required." });
    }
    let assignedUser = null;
    if (assignedTo) {
      assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(400).json({ message: "Assigned user not found." });
      }
    }
    const newTask = await Task.create({
      title,
      description,
      status,
      assignedTo: assignedUser?._id || null,
    });
    await log(req.user._id, newTask._id, "create", newTask);
    const populated = await newTask.populate("assignedTo", "username");
    req.io.emit("taskCreated", populated);
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id  ← version-check removed so stage updates always work
router.put("/:id", protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    // Apply only the fields we expect (status, title, description, priority, assignedTo)
    const allowed = [
      "status",
      "title",
      "description",
      "priority",
      "assignedTo",
    ];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });
    // bump version
    task.version++;
    await task.save();

    await log(req.user._id, task._id, "update", {
      status: task.status,
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignedTo: task.assignedTo,
    });

    const populated = await task.populate("assignedTo", "username");
    req.io.emit("taskUpdated", populated);
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", protect, async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    await log(req.user._id, req.params.id, "delete", {});
    req.io.emit("taskDeleted", { id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks/:id/assign
router.post("/:id/assign", protect, async (req, res, next) => {
  try {
    let userId = req.body.userId;
    if (req.body.smart) {
      const counts = await Task.aggregate([
        { $match: { status: { $ne: "Done" } } },
        { $group: { _id: "$assignedTo", cnt: { $sum: 1 } } },
      ]);
      const map = counts.reduce((m, x) => ((m[x._id] = x.cnt), m), {});
      const allUsers = await User.find();
      if (!allUsers.length) {
        return res
          .status(400)
          .json({ message: "No users available for smart assign." });
      }
      userId = allUsers.sort((a, b) => (map[a._id] || 0) - (map[b._id] || 0))[0]
        ._id;
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    const assignedUser = await User.findById(userId);
    if (!assignedUser) {
      return res.status(400).json({ message: "Assigned user not found." });
    }
    task.assignedTo = assignedUser._id;
    task.version++;
    await task.save();

    await log(req.user._id, task._id, "assign", {
      assignedTo: assignedUser._id,
    });

    const populated = await task.populate("assignedTo", "username");
    req.io.emit("taskAssigned", populated);
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
