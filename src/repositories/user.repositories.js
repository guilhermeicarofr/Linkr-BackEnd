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
                s.id AS "shareId",
                s."userId" AS "shareUserId",
                us."name" AS "shareUserName"
              FROM share s
              JOIN users us ON s."userId"=us.id
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
                NULL AS "shareId",
                NULL AS "shareUserId",
                NULL AS "shareUserName"
              FROM posts AS p
              JOIN users AS u ON u.id=p."userId"
              WHERE p."deletedAt" IS NULL
            )
          
          ) AS "feed"
        
        WHERE (feed."userId"=$1 AND feed."shareId" IS NULL) OR feed."shareUserId"=$1
        ORDER BY feed."createdAt" DESC;`,
		[ userId ]
	);
}

async function listUsersByName(name) {
	return db.query(
		`SELECT 
            u.id,
            u.name,
            u.picture,
            f."userId"        
        FROM users AS u    
        LEFT JOIN follows AS f ON u.id = f."userId"     
        WHERE  u.name ILIKE $1 AND u."deletedAt" IS NULL
        GROUP BY u.id, f."userId", f."followedBy"
        ORDER BY f."followedBy", u.name;`,
		[`${name}%`]
	);
}

export { listUserPosts, getUser, listUsersByName };
