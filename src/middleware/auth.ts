import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthUser {
  id: number;
  role: "HR" | "ADMIN" | "EMPLOYEE";
}

export const authMiddleware = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: "Not authenticated" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
      (req as any).user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};
