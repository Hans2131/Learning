import { Router, Request, Response } from "express";
import { UserDto } from "#models/user.js";
import UserRepo from "#repositories/user.repo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const userRepo = new UserRepo();
const JWT_SECRET = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : (() => {
      throw new Error("JWT_SECRET is not defined");
    })();
const JWT_EXPIRATION = parseInt(process.env.JWT_EXPIRATION ?? "3600");

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const existingUser = await userRepo.getUserByEmail(email);
  if (existingUser) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  const user: UserDto = {
    email,
    password: await bcrypt.hash(password, 10), // Hash the password before saving
  };

  const newUser = await userRepo.createUser(user);

  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password fields are required" });
    return;
  }

  const user = await userRepo.getUserByEmail(email);
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  res.status(200).json({ message: "Login successful", user, token });
});

export default router;
