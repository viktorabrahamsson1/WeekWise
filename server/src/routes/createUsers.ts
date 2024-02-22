import User from "../models/user";
import crypto from "crypto";

import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { sendVerificationEmail } from "../utils/sendVerificationEmail ";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const date = new Date().toISOString().split("T")[0];
      const verificationToken = crypto.randomBytes(20).toString("hex");

      user = new User({
        ...req.body,
        isVerified: false,
        verificationToken,
        createdAt: date,
      });
      await user.save();

      sendVerificationEmail(req.body.email, verificationToken);

      return res.status(200).json({ message: "Account created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/register/verify/:token", async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ verificationToken: token.toString() });

    if (!user) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    user.isVerified = true;
    user.verificationToken = "";
    await User.updateOne(
      { verificationToken: token },
      { $set: { isVerified: true, verificationToken: "" } }
    );

    console.log(user);

    res.status(200).send("Email verified");
  } catch (error) {
    res.status(500).json({ message: "Error validating email" });
  }
});

export default router;
