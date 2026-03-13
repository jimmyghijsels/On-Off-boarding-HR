import { createDatabase } from "@kilocode/app-builder-db";
import * as schema from "./schema";

const hasDbConfig = !!(process.env.DB_URL || process.env.KILO_DB_URL);

let dbInstance: ReturnType<typeof createDatabase> | null = null;

function createDb() {
  if (!dbInstance && hasDbConfig) {
    dbInstance = createDatabase(schema);
  }
  return dbInstance;
}

export function getDb() {
  const db = createDb();
  if (!db) {
    throw new Error("Database not configured. Please set DB_URL or KILO_DB_URL environment variable.");
  }
  return db;
}
