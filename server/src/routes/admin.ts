import express, { Request, Response } from "express";
import User from "../models/user";
import verifyAdmin from "../middleware/verifyAdmin";

const router = express.Router();

router.get("/getUsers", verifyAdmin, async (req: Request, res: Response) => {
  const filter = {};
  const allUsers = await User.find(filter);

  if (!allUsers) {
    return res.status(400).json({ message: "No users found" });
  }

  return res.status(200).json(allUsers);
});

router.patch(
  "/updateUserInfo",
  verifyAdmin,
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, role, originalEmail } =
      req.body;
    try {
      const user = await User.findOne({ email: originalEmail });
      const potentialUser = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "No user" });
      }

      if (potentialUser && potentialUser.id !== user.id) {
        return res.status(400).json({ message: "Email in use" });
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.role = role;

      if (password && password.trim() !== "") {
        user.password = password;
      }

      await user.save();

      res.status(200).json({ message: "User info successfully changed" });
    } catch (err) {
      console.log(err);
    }
  }
);

router.delete(
  "/deleteUser",
  verifyAdmin,
  async (req: Request, res: Response) => {
    await User.deleteOne({ email: req.body.email });

    return res.status(200).json({ message: "User deleted" });
  }
);

router.get(
  "/getUserToday/:date",
  verifyAdmin,
  async (req: Request, res: Response) => {
    const { date } = req.params;
    const filter = { createdAt: date };
    const users = await User.find(filter);

    if (!users) {
      return res.status(200).json({ message: "No accounts created today" });
    }

    return res.status(200).json(users);
  }
);

export default router;
