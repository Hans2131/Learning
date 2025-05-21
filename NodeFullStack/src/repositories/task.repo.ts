import pool from "#utils/db.js";
import { Task, TaskDto } from "#models/task.js";

export default class TaskRepo {
  async getAllTasks(): Promise<Task[]> {
    const result = await pool.query("SELECT * FROM tasks");
    return result.rows;
  }

  async getTaskById(id: number): Promise<Task | null> {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async createTask(task: TaskDto): Promise<Task> {
    const result = await pool.query(
      "INSERT INTO tasks (userid, title, description) VALUES ($1, $2, $3) RETURNING *",
      [task.userId, task.title, task.description],
    );
    return result.rows[0];
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
