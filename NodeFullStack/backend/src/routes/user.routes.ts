import { Router, Request, Response, NextFunction } from "express";
import { UserDto } from "@shared/models/user.js";
import UserRepo from "#repositories/user.repo.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const router = Router();
const userRepo = new UserRepo();

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await userRepo.getUserByEmail(email);
      if (!user) return done(null, false, { message: "Incorrect credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return done(null, false, { message: "Incorrect credentials" });

      return done(null, user);
    },
  ),
);

// session support
passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await userRepo.getUserById(id);
  done(null, user || false);
});

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
  const newUser = req.body as UserDto;

  if (!newUser.email || !newUser.password || !newUser.username) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const existingUser = await userRepo.getUserByEmail(newUser.email);
  if (existingUser) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  const user: UserDto = {
    email: newUser.email,
    password: await bcrypt.hash(newUser.password, 10), // Hash the password before saving
    username: newUser.username,
  };

  const createdUser = await userRepo.createUser(user);

  res
    .status(201)
    .json({ message: "User registered successfully", user: createdUser });
});

router.post(
  "/login",
  passport.authenticate("local"),
  async (req: Request, res: Response) => {
    const user = req.user;
    res.status(200).json({ message: "Login successful", user });
  },
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "Logged out" });
  });
});

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  if (req.user) return next();
  else res.redirect("/");
}

export default router;
