import pool from "#utils/db.js";
import { User } from "#models/user.js";
import { UserDto } from "@shared/models/user.js";

export default class UserRepo {
  async getUserByEmail(email: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async getUserById(id: number): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async createUser(user: UserDto): Promise<User> {
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [user.username, user.email, user.password],
    );
    return result.rows[0];
  }
}
