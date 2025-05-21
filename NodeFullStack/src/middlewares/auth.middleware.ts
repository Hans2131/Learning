import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET ?? "invalid token",
    function (err, decoded) {
      if (err) {
        res.status(401).json({ message: "Token invalid" });
        return;
      }
      req.body.user = decoded;
      console.log(decoded);
      next();
    },
  );
}
