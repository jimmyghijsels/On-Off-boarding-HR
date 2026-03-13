import { runMigrations } from "@kilocode/app-builder-db";
import { createDatabase } from "@kilocode/app-builder-db";
import * as schema from "./schema";

const db = createDatabase(schema);

runMigrations(db, {}, { migrationsFolder: "./src/db/migrations" }).catch(console.error);
