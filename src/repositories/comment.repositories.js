import { db } from "../database/database.js";

async function listComments(postId) {
	return db.query(
		`SELECT 
		c."userId",
		u.name, 
		u.picture,
		c."postId", 
		c.comment, 
		c."userId"		
		AS 
		"isFollowing" 
		 FROM comments c
		 JOIN posts p ON c."postId" = p.id 
		 JOIN users u ON c."userId" = u.id
		 WHERE c."postId" = $1 ORDER BY c.id DESC;`,[postId]
	);
}

async function insertComment({postId, userId, comment}) {
	return db.query(
		`INSERT INTO "comments" ("postId", "userId","comment") VALUES ($1, $2, $3);`,
		[postId, userId,comment]
	);
}

async function countComments(postId) {
	return db.query(
		`SELECT COUNT(comments.id) AS "commentCount" FROM comments WHERE comments."postId" = $1;`,
		[postId]
	);
}

export { listComments, insertComment, countComments };
