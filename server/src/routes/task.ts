import express, { Request, Response } from "express";
import verifyToken from "../middleware/verifyAuthToken";

const router = express.Router();

router.get("/getTasks", verifyToken, async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(200).json({ message: "Error gettings tasks" });
  }
});

router.post("/createTask", verifyToken, async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(200).json({ message: "Error creating task" });
  }
});

export default router;
