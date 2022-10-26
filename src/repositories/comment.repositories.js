import { db } from "../database/database.js";

async function listComments(postId) {
	return db.query(
		`SELECT u.id, u.name, c.comment,, COUNT(ph.id) AS quotes FROM hashtags h 
		JOIN "postsHashtags" ph ON h.id = ph."hashtagId" 
		WHERE h."deletedAt" IS NULL GROUP BY h.id ORDER BY quotes DESC LIMIT 10;`
	);
}

async function insertComment({postId, userId, comment}) {
	return db.query(
		`INSERT INTO "comments" ("postId", "userId","comment") VALUES ($1, $2, $3);`,
		[postId, userId,comment]
	);
}

export { listComments, insertComment };
