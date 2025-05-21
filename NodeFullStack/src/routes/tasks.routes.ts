import { Router, Request, Response } from "express";
import { TaskDto } from "#models/task.js";
import TaskRepo from "#repositories/task.repo.js";

const router = Router();
const taskRepo = new TaskRepo();

router.get("/", async (req: Request, res: Response) => {
  const tasks = await taskRepo.getAllTasks();
  res.json(tasks);
});

router.get("/:id", async (req: Request, res: Response) => {
  const task = await taskRepo.getTaskById(parseInt(req.params.id));

  if (!task) {
    res.status(404).send("Task not found");
  } else {
    res.json(task);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const task: TaskDto = {
    userId: req.currentUser!.id,
    title: req.body.title,
    description: req.body.description,
  };

  const createdTask = await taskRepo.createTask(task);

  res.status(201).json(createdTask);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const succeeded = await taskRepo.deleteTask(taskId);

  if (!succeeded) {
    res.status(404).send("Task not found");
  }

  res.status(204).send();
});

export default router;
