import express, { Request, Response } from "express";
import calenderTask from "../models/calenderTask";
import verifyToken from "../middleware/verifyAuthToken";

const router = express.Router();

router.get("/:week", verifyToken, async (req: Request, res: Response) => {
  try {
    const week = parseInt(req.params.week);
    const tasks = await calenderTask.find({ week });
    if (!tasks) {
      return res.status(400).json({ message: "No tasks found" });
    }
    res.json(tasks);
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
      const task = new calenderTask({ content, day, week });
      await task.save();
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
      res.status(200).json({ message: "Calender task successfully deleted" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting calender task" });
    }
  }
);

export default router;
