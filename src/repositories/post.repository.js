import { db } from "../database/database.js";

async function insertNewPost(userId, url, description) {
  return db.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1,$2, $3)`,
    [userId, url, description]
  );
}

async function getPosts() {
  return db.query(`SELECT 
                      p."userId" AS "userId",
                      u.name,
                      u.picture,
                      p.id AS "postId", 
                      p.url, 
                      p.description
                    FROM posts AS p
                    JOIN users AS u ON u.id=p."userId"
                    ORDER BY p."createdAt" DESC
                    LIMIT 20;`);
}

export { insertNewPost, getPosts };
