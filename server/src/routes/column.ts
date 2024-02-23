import express, { Request, Response } from "express";
import Column from "../models/column";
import verifyToken from "../middleware/verifyAuthToken";

const router = express.Router();

router.get("/getColumns", verifyToken, async (req: Request, res: Response) => {
  try {
    const columns = await Column.find({ userId: req.userId }).populate("tasks");
    return res.json(columns);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error getting columns" });
  }
});

router.post(
  "/createColumn",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      const column = new Column({
        title,
        userId: req.userId,
      });
      await column.save();
      res.status(201).json(column);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error creating column" });
    }
  }
);

router.delete(
  "/deleteColumn/:columnId",
  async (req: Request, res: Response) => {
    const { columnId } = req.params;
    try {
      const deletedColumn = await Column.findByIdAndDelete(columnId);
      if (!deletedColumn) {
        return res.status(404).json({ message: "Column not found" });
      }
      res.status(200).json({ message: "Column deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error deleting column" });
    }
  }
);

router.post("/updateColumn", async (req: Request, res: Response) => {
  try {
    const { columnId, title } = req.body;
    console.log(columnId);
    console.log(title);
    const column = await Column.findById(columnId);

    if (!column) {
      return res.status(401).json({ message: "No column found" });
    }

    column.title = title;

    await column.save();

    res.status(200).json({ message: "Column successfully updated", column });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Error updating column" });
  }
});

export default router;
