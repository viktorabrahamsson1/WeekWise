import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  progress: { tasks: number; completedTasks: number };
  isVerified: boolean;
  verificationToken: string;
  createdAt: string;
};

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin", "superAdmin"],
  },
  progress: {
    type: { tasks: Number, completedTasks: Number },
    required: true,
    default: { tasks: 0, completedTasks: 0, inCompletedTasks: 0 },
  },
  isVerified: { type: Boolean, required: true, default: false },
  verificationToken: { type: String },
  createdAt: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
