import express, { Request, Response } from "express";
import verifyToken from "../middleware/verifyAuthToken";
import User from "../models/user";
import createAuthToken from "../utils/CreateAuthToken";

const router = express.Router();

router.post(
  "/updateUserInfo",
  verifyToken,
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const user = await User.findOne({ email: req.email });
      const potentialUser = await User.findOne({ email });
      if (user !== null) {
        if (
          potentialUser &&
          potentialUser._id.toString() !== user._id.toString()
        ) {
          return res.status(400).json({ message: "email in use" });
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        if (password && password.trim() !== "") {
          user.password = password;
        }
        await user.save();

        res.cookie("auth_token", "", {
          expires: new Date(0),
        });

        createAuthToken(req, res, user);
        res.status(200).json({ message: "User info updated successfully" });
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export default router;
