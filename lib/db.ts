import { Pool } from "pg";
const globalForDb = globalThis as unknown as {
  db: Pool | undefined;
};

function createPool() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  return new Pool({ connectionString: url });
}

const db = globalForDb.db ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}

export { db };
export default db;
