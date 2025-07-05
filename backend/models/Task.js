const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"], // fixed enum
      default: "To Do",
    },
    priority: { type: Number, default: 0 },
    version: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
