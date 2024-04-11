import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      role: string;
      firstName: string;
      lastName: string;
      email: string;
      isVerified: boolean;
    }
  }
}

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const role = (decoded as JwtPayload).userRole;
    console.log(role);
    if (role !== "superAdmin") {
      return res.status(401).json({ message: "unauthorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyAdmin;
