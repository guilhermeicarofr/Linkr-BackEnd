import { db } from "../database/database.js";

async function insertNewPost(url, description) {
  return db.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1,$2, $3)`,
    [1, url, description]
  );
}

export { insertNewPost };
