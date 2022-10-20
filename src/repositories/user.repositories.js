import { db } from "../database/database.js";

async function getUsersRepository(userId) {
  return db.query(`SELECT id, name, picture FROM users WHERE id = $1;`, [
    userId,
  ]);
}

async function getUserPostsRepository(userId) {
  return db.query(
    `SELECT 
            p."userId" AS "userId",
            u.name,
            u.picture,
            p.id AS "postId", 
            p.description,
            p.url
        FROM posts AS p
        JOIN users AS u ON u.id=p."userId"
        WHERE p."userId" = $1
        ORDER BY p."createdAt" DESC;`,
    [userId]
  );
}

export { getUserPostsRepository, getUsersRepository };
