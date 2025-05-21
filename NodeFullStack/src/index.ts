import express, { NextFunction, Request, Response } from "express";
import taskRoutes from "#routes/tasks.routes.js";
import userRoutes from "#routes/user.routes.js";
import authMiddleware from "#middlewares/auth.middleware.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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
  res.status(500).json({ message: err.message ?? "Something went wrong" });
});

app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: "Sorry can't find that!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
