import express, { Request, Response } from "express";
import User from "../models/user";
import { check, validationResult } from "express-validator";
import createAuthToken from "../utils/authToken";

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

      user = new User(req.body);
      await user.save();

      //! Create auth token with data stored in it
      createAuthToken(req, res, user);

      return res.status(200).json({ message: "Account created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
