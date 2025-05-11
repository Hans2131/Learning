
import { Pool } from "pg";
import { Task, TaskDto } from "../models/task";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
});

export default class TaskRepo {
    async getAllTasks(): Promise<Task[]> {
        const result = await pool.query("SELECT * FROM tasks");
        return result.rows;
    }

    async getTaskById(id: number): Promise<Task | null> {
        const result = await pool.query("SELECT * FROM tasks WHERE TaskID = $1", [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    async createTask(task: TaskDto): Promise<Task> {
        const result = await pool.query(
            "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
            [task.title, task.description]
        );
        return result.rows[0];
    }

    async deleteTask(id: number): Promise<boolean> {
        const result = await pool.query("DELETE FROM tasks WHERE TaskID = $1", [id]);
        return (result.rowCount ?? 0) > 0;
    }
}