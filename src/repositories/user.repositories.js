import { db } from "../database/database.js";

async function getUser(userId) {
	return db.query(`SELECT id, name, picture FROM users WHERE id = $1;`, [
		userId,
	]);
}

async function listUserPosts(userId) {
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
        WHERE p."userId" = $1 AND p."deletedAt" IS NULL
        ORDER BY p."createdAt" DESC;`,
		[userId]
	);
}

async function listUsersByName(name) {
	return db.query(
		`SELECT 
            u.id,
            u.name,
            u.picture          
        FROM users AS u        
        WHERE  u.name ILIKE $1 AND u."deletedAt" IS NULL
        ORDER BY u.name;`,
		[`${name}%`]
	);
}

export { listUserPosts, getUser, listUsersByName };
