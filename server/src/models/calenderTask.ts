import mongoose, { Document } from "mongoose";

export interface Task extends Document {
  _id: string;
  content: string;
  day: string;
  week: number;
}

const calenderTaskSchema = new mongoose.Schema({
  content: { type: String, required: true },
  day: { type: String, required: true },
  week: { type: Number, required: true },
});

const calenderTask = mongoose.model<Task>("calenderTask", calenderTaskSchema);
export default calenderTask;
