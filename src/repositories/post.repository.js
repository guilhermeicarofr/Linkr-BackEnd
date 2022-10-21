import { db } from "../database/database.js";

async function insertNewPost({ description, userId, url }) {
  return db.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1, $2, $3) RETURNING posts.id`,
    [userId, url, description]
  );
}

async function getPosts() {
  return db.query(`SELECT 
                      p."userId" AS "userId",
                      u.name,
                      u.picture,
                      p.id AS "postId",
                      p.description,
                      p.url
                    FROM posts AS p
                    JOIN users AS u ON u.id=p."userId"
                    ORDER BY p."createdAt" DESC
                    LIMIT 20;`);
}

async function listLikes (postId) {
	return db.query(
		`SELECT u.name,u.id FROM likes l 
		JOIN users u ON l."userId" = u.id 
		WHERE "postId" = $1;`,[postId]
	);
};

export { insertNewPost, getPosts, listLikes };
