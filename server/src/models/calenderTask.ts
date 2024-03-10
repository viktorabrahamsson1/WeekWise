import mongoose, { Document } from "mongoose";

export interface Task extends Document {
  _id: string;
  userId: string;
  content: string;
  day: string;
  week: number;
}

const calenderTaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  day: { type: String, required: true },
  week: { type: Number, required: true },
});

const calenderTask = mongoose.model<Task>("calenderTask", calenderTaskSchema);
export default calenderTask;
