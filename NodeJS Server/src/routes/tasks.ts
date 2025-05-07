import { Router, Request, Response } from "express";
import { Task } from "../models/task";

const router = Router();
let tasks: Task[] = [];

router.get('/', (req: Request, res: Response) => {
    res.json(tasks);
});

router.get('/:id', (req: Request, res: Response) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        res.json(task);
    }
});

router.post('/', (req: Request, res: Response) => {
    const task: Task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false
    };
    tasks.push(task);
    res.status(201).json(task);
});

router.delete('/:id', (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
});

export default router;