import express, { Request, Response } from "express";
import calenderTask from "../models/calenderTask";
import User from "../models/user";
import verifyToken from "../middleware/verifyAuthToken";

const router = express.Router();

router.get("/:week", verifyToken, async (req: Request, res: Response) => {
  try {
    const week = parseInt(req.params.week);
    const tasks = await calenderTask.find({ week, userId: req.userId });
    if (!tasks) {
      return res.status(400).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Error getting calender tasks" });
  }
});

router.post(
  "/createCalenderTask",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { content, day, week } = req.body;
      const task = new calenderTask({ content, day, week, userId: req.userId });
      await task.save();

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }
      const tasks = user.progress.tasks + 1;
      const completedTasks = user.progress.completedTasks;

      await user.updateOne({
        progress: { tasks, completedTasks },
      });

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error creating calender task" });
    }
  }
);

router.delete(
  "/deleteCalenderTask",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { taskId } = req.body;
      await calenderTask.findByIdAndDelete(taskId);

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }
      const tasks = user.progress.tasks - 1;
      const completedTasks = user.progress.completedTasks;

      await user.updateOne({
        progress: { tasks, completedTasks },
      });
      res.status(200).json({ message: "Calender task successfully deleted" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting calender task" });
    }
  }
);

router.delete(
  "/completeCalenderTask",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { taskId } = req.body;
      await calenderTask.findByIdAndDelete(taskId);

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }
      const tasks = user.progress.tasks;
      const completedTasks = user.progress.completedTasks + 1;

      await user.updateOne({
        progress: { tasks, completedTasks },
      });
      res.status(200).json({ message: "Calender task successfully deleted" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting calender task" });
    }
  }
);

router.patch(
  "/updateCalenderTask",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { taskId, content } = req.body;
      const updatedTask = await calenderTask.findByIdAndUpdate(
        taskId,
        { $set: { content: content } },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Column not found" });
      }

      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: "Error deleting calender task" });
    }
  }
);

router.post(
  "/getProgress",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(400).json({ message: "No user found" });
      const allTasks = user.progress.tasks;
      const completedTasks = user.progress.completedTasks;

      res.status(200).json({ allTasks, completedTasks });
    } catch (error) {
      res.status(400).json({ message: "Error retriving completed tasks" });
    }
  }
);

export default router;
