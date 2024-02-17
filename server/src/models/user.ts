import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  role: string;
  isVerified: boolean;
  verificationToken: string;
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
  profilePicture: { type: String, default: "defaultUser.png" },
  isVerified: { type: Boolean, required: true, default: false },
  verificationToken: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
