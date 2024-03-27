import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";

import "./models";

import registerUserRoutes from "./routes/createUsers";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import adminRoutes from "./routes/admin";
import columnRoutes from "./routes/column";
import taskRoutes from "./routes/task";
import calenderTasksRoutes from "./routes/calenderTask";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/", (_, res) => res.send("Server is working"));

app.use("/api/auth", authRoutes);
app.use("/api/createUser", registerUserRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/column", columnRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/calenderTask", calenderTasksRoutes);

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
