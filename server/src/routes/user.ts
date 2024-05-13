import express, { Request, Response } from "express";
import User from "../models/user";
import createAuthToken from "../utils/CreateAuthToken";
import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  sendVerificationEmail,
  sendVerificationPassword,
} from "../utils/sendVerificationEmail ";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

router.patch(
  "/updateUserInfo",
  checkAuth("user"),
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
        if (email === req.email) {
          createAuthToken(req, res, user);
          return res.status(200).json({ message: "Info successfully changed" });
        }
        const verificationToken = crypto.randomBytes(20).toString("hex");
        sendVerificationEmail(email, verificationToken);
        user.isVerified = false;
        user.verificationToken = verificationToken;

        await user.save();

        return res.status(200).json({
          message: "Info successfully changed",
          orginalEmail: req.email,
          newEmail: email,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
);

router.patch("/forgotPassword", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User do not exist" });
    }

    const passwordToken = jwt.sign(
      {
        email,
        password,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      },
    );

    sendVerificationPassword(email, passwordToken);

    return res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
  }
});

router.get(
  "/forgotPassword/:passwordToken",
  async (req: Request, res: Response) => {
    const { passwordToken } = req.params;
    try {
      const decoded = jwt.verify(
        passwordToken,
        process.env.JWT_SECRET_KEY as string,
      );
      const email = (decoded as JwtPayload).email;
      const password = (decoded as JwtPayload).password;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }
      user.password = password;
      await user.save();

      return res.status(200).json({ message: "Password successfully changed" });
    } catch (error) {
      console.error(error);
    }
  },
);

export default router;
