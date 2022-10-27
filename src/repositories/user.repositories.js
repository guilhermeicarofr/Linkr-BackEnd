import { db } from "../database/database.js";

async function getUser(userId) {
	return db.query(`SELECT id, name, picture FROM users WHERE id = $1;`, [
		userId,
	]);
}

async function listUserPosts(userId) {
	return db.query(`
        SELECT *
        FROM (
            
            (
                SELECT 
                p."userId" AS "userId",
                    u.name,
                    u.picture,
                    p.id AS "postId",
                    p.description,
                    p.url,
                    s."createdAt",
                    s."userId" AS "sharedBy",
                    s.id AS "shareId"
                FROM share s
                JOIN posts p ON s."postId"=p.id
                JOIN users u ON p."userId"=u.id
                WHERE p."deletedAt" IS NULL
            )
            
            UNION ALL
            
            (
                SELECT 
                    p."userId" AS "userId",
                    u.name,
                    u.picture,
                    p.id AS "postId",
                    p.description,
                    p.url,
                    p."createdAt",
                    NULL AS "sharedBy",
                    NULL AS "sharedId"
                FROM posts AS p
                JOIN users AS u ON u.id=p."userId"
                WHERE p."deletedAt" IS NULL
            )
        
        ) AS "feed"
        
        WHERE feed."userId" = $1 OR feed."sharedBy"=$1
        ORDER BY feed."createdAt" DESC;`,
		[ userId ]
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
