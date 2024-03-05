import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  content: { type: String, required: true },
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;