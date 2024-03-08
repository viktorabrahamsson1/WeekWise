import express, { Request, Response } from "express";
import Task from "../models/task";
import verifyToken from "../middleware/verifyAuthToken";

const router = express.Router();

router.get("/getTasks", verifyToken, async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ userId: req.userId });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(200).json({ message: "Error gettings tasks" });
  }
});

router.post("/createTask", verifyToken, async (req: Request, res: Response) => {
  try {
    const { columnId, position, content } = req.body;

    const task = new Task({
      columnId,
      userId: req.userId,
      position,
      content,
    });

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(200).json({ message: "Error creating task" });
  }
});

router.patch(
  "/updateTask",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { taskId, content } = req.body;
      const updatedTask = Task.findOneAndUpdate(taskId, { content });

      res.status(200).json({ updatedTask, message: "Created task" });
    } catch (error) {
      res.status(200).json({ message: "Error updating task" });
    }
  }
);

router.delete(
  "/deleteTask",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { taskId } = req.body;
      await Task.findByIdAndDelete(taskId);

      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      res.status(200).json({ message: "Error deleting task" });
    }
  }
);

router.patch(
  "/updateActiveColumn",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { taskId, columnId } = req.body;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(400).json({ message: "No task found" });
      }

      task.columnId = columnId;
      await task.save();

      res.status(200).json({ message: "task position successfully changed" });
    } catch (error) {
      res.status(400).json({ message: "Error updating task position" });
    }
  }
);

export default router;
