import { createServer } from "@graphql-yoga/node";
import { SqliteRepository } from "./db/sqlite";
import { schema } from ".";

async function main() {
  const dbInstance = new SqliteRepository();
  await dbInstance.init();
  const server = createServer({ schema: schema(dbInstance) });
  await server.start();
}

main();
