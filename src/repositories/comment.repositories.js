import { db } from "../database/database.js";

async function listComments(postId) {
	return db.query(
		`SELECT c."userId", c."postId", c.comment, p."userId" AS "isFollowing" FROM comments c
		 JOIN posts p ON c."postId" = p.id 
		 WHERE c."postId" = $1 ORDER BY c.id DESC;`,[postId]
	);
}

async function insertComment({postId, userId, comment}) {
	return db.query(
		`INSERT INTO "comments" ("postId", "userId","comment") VALUES ($1, $2, $3);`,
		[postId, userId,comment]
	);
}

export { listComments, insertComment };
