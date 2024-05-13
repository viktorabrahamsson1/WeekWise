import { Request, Response, NextFunction } from "express";
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

const checkAuth = (role: "user" | "superAdmin") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.cookies["auth_token"];
    if (!authToken) {
      return res.status(401).json({ message: "unauthroized" });
    }
    try {
      const decoded = jwt.verify(
        authToken,
        process.env.JWT_SECRET_KEY as string,
      );
      const checkRole = (decoded as JwtPayload).userRole;

      if (role === "superAdmin" && checkRole === "superAdmin") {
        return next();
      }
      req.userId = (decoded as JwtPayload).userId;
      req.role = checkRole;
      req.firstName = (decoded as JwtPayload).firstName;
      req.lastName = (decoded as JwtPayload).lastName;
      req.email = (decoded as JwtPayload).email;
      req.isVerified = (decoded as JwtPayload).isVerified;

      next();
    } catch (err) {
      return res.status(401).json({ message: "unauthroized" });
    }
  };
};

export default checkAuth;
