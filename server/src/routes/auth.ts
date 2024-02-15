import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import bcrypt from "bcryptjs";
import User from "../models/user";
import verifyToken from "../middleware/verifyAuthToken";
import createAuthToken from "../utils/authToken";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Invalid credentials").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      //! Create auth token with data stored in it
      createAuthToken(req, res, user);

      res.status(200).json({ userId: user.id });
    } catch (error) {
      return res.json(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({
    userId: req.userId,
    userRole: req.role,
    firstName: req.firstName,
    lastName: req.lastName,
    email: req.email,
  });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send({});
});

router.patch("/editUserInfo", async (req: Request, res: Response) => {
  return res.send({ message: "hello" });
});

export default router;
