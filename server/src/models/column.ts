import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  position: { type: Number, required: true, default: 0 },
});

const Column = mongoose.model("Column", columnSchema);

export default Column;
