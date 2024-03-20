import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserType } from "../models/user";

const createAuthToken = (req: Request, res: Response, user: UserType) => {
  const token = jwt.sign(
    {
      userId: user.id,
      userRole: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: false,
    path: "/",
    maxAge: 86400000,
  });
};

export default createAuthToken;
