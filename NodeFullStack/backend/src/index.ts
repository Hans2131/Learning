import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import https from "https";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import taskRoutes from "#routes/tasks.routes.js";
import userRoutes from "#routes/user.routes.js";
import authMiddleware from "#middlewares/auth.middleware.js";

const app = express();
const port = process.env.PORT || 443;
const options = {
  key: fs.readFileSync("certs/key.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
};
const httpsServer = https.createServer(options, app);

const COOKIE_SECRET =
  process.env.COOKIE_SECRET ??
  (() => {
    throw new Error("COOKIE_SECRET is not defined");
  })();

const COOKIE_EXPIRATION = parseInt(
  process.env.COOKIE_EXPIRATION ?? "86400000", // Default to 1 day in milliseconds
);

app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
app.use(helmet());

app.use(
  session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Use true if using HTTPS
      httpOnly: true,
      maxAge: COOKIE_EXPIRATION ?? 24 * 60 * 60 * 1000, // 1 day
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRoutes);
app.use(authMiddleware);
app.use("/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.get("/error", () => {
  console.log("arrived?");
  throw new Error("This is a forced error11");
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message ?? "Something went wrong" });
});

app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: "Sorry can't find that!" });
});

httpsServer.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
