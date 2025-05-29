import { Request, Response, NextFunction } from "express";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
}
