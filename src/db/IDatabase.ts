import { User } from "../../src/types";

export default interface DatabaseRepository {
  init(): Promise<void>;
  createTableIfNotExists(): Promise<void>;
  createUser(name: string, age: number): Promise<User>;
  getUsers(): Promise<User[]>;
  getUser(name: string): Promise<User>;
  updateUsername(
    id: string,
    username: string
  ): Promise<{ error: boolean; newUsername: string }>;
}
