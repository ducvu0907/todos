import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  status: {
    type: String,
    enum: ["todo", "in progress", "completed"],
    default: "todo",
  },
}, { timestamps: true });

const Task = mongoose.model("Task", userSchema);
export default Task;