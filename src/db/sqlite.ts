import sqlite3 from "sqlite3";
import { open, Database as SQliteDb } from "sqlite";
import { uuid } from "uuidv4";
import DatabaseRepository from "./IDatabase";
import { User } from "../../src/types";

export class SqliteRepository implements DatabaseRepository {
  public db: SQliteDb;

  async init(): Promise<void> {
    this.db = await open({
      filename: "./.sqlite",
      driver: sqlite3.Database,
    });
    await this.createTableIfNotExists();
  }

  async createTableIfNotExists(): Promise<void> {
    try {
      await this.db.run(
        "CREATE TABLE  IF NOT EXISTS  users ( name CHAR,  age CHAR,id CHAR );"
      );
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(name: string, age: number): Promise<User> {
    const id = uuid();
    try {
      await this.db.run("INSERT INTO users VALUES (?,?,?)", name, age, id);

      return { name, age, id };
    } catch (error) {
      console.error(error);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.db.all("SELECT * FROM users");
      return users;
    } catch (error) {
      console.error(error);
    }
  }

  async getUser(name: string): Promise<User> {
    const user = await this.db.get("SELECT * FROM users WHERE name = ?", name);
    return user;
  }

  async updateUsername(
    id: string,
    username: string
  ): Promise<{ error: boolean; newUsername: string }> {
    try {
      await this.db.run(
        `UPDATE users SET name = '${username}' WHERE id = '${id}'`
      );
      return { error: false, newUsername: username };
    } catch (error) {
      console.error(error);
    }
  }
}
