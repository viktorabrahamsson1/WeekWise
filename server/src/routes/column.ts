import express, { Request, Response } from "express";
import Column from "../models/column";
import Task from "../models/task";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

router.get(
  "/getColumns",
  checkAuth("user"),
  async (req: Request, res: Response) => {
    try {
      const columns = await Column.find({ userId: req.userId })
        .sort("position")
        .populate("tasks");
      return res.json(columns);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error getting columns" });
    }
  },
);

router.post(
  "/createColumn",
  checkAuth("user"),
  async (req: Request, res: Response) => {
    try {
      const { columns } = req.body;
      const column = new Column({
        title: `Column ${columns.length + 1}`,
        userId: req.userId,
        position: columns.length,
      });
      await column.save();

      res.status(201).json(column);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error creating column" });
    }
  },
);

router.delete(
  "/deleteColumn/:columnId",
  checkAuth("user"),
  async (req: Request, res: Response) => {
    const { columnId } = req.params;
    try {
      const deletedColumn = await Column.findByIdAndDelete(columnId);
      if (!deletedColumn) {
        return res.status(404).json({ message: "Column not found" });
      }
      await Task.deleteMany({ columnId });

      res.status(200).json({ message: "Column deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error deleting column" });
    }
  },
);

router.patch(
  "/updateColumn",
  checkAuth("user"),
  async (req: Request, res: Response) => {
    const { columnId, title } = req.body;
    try {
      const updatedColumn = await Column.findByIdAndUpdate(
        columnId,
        { $set: { title: title } },
        { new: true },
      );

      if (!updatedColumn) {
        return res.status(404).json({ message: "Column not found" });
      }

      res.status(200).json({ updatedColumn });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Error updating column" });
    }
  },
);

router.patch(
  "/position",
  checkAuth("user"),
  async (req: Request, res: Response) => {
    try {
      const orderedColumns = req.body;

      await Promise.all(
        orderedColumns.map(
          (column: { _id: string; position: number }, index: number) =>
            Column.findByIdAndUpdate(
              column._id,
              { position: index },
              { new: true },
            ).exec(),
        ),
      );

      const updatedColumns = await Column.find({ userId: req.userId })
        .sort("position")
        .populate("tasks");

      res.status(200).json(updatedColumns);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error updating positions" });
    }
  },
);

export default router;
