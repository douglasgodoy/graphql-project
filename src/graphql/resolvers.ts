import { SqliteRepository } from "../db/sqlite";
import { ageGenerator, fullNameGenerator } from "../utils";

export const resolvers = (db: SqliteRepository) => ({
  Query: {
    users: async () => {
      const users = await db.getUsers();
      return users;
    },

    user: async (_, { name }: { name: string }) => {
      const user = await db.getUser(name);
      return user;
    },
  },

  Mutation: {
    addUser: async (
      _,
      {
        name = fullNameGenerator(),
        age = ageGenerator(),
      }: { name: string; age: number }
    ) => {
      const createQuery = await db.createUser(name, age);
      return createQuery;
    },

    updateUsername: async (
      _,
      {
        id,
        username,
      }: {
        id: string;
        username: string;
      }
    ) => {
      const updateResponse = await db.updateUsername(id, username);
      return updateResponse;
    },
  },
});
