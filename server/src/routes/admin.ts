import express, { Request, Response } from "express";
import User from "../models/user";

const router = express.Router();

router.get("/getUsers", async (req: Request, res: Response) => {
  const filter = {};
  const allUsers = await User.find(filter);

  if (!allUsers) {
    return res.status(400).json({ message: "No users found" });
  }

  return res.status(200).json(allUsers);
});

export default router;
