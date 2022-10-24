import { db } from "../database/database.js";

async function listHashtagRepository() {
	return db.query(
		`SELECT h.name, COUNT(ph.id) AS quotes FROM hashtags h 
		JOIN "postsHashtags" ph ON h.id = ph."hashtagId" 
		WHERE h."deletedAt" IS NULL GROUP BY h.id ORDER BY quotes DESC LIMIT 10;`
	);
}

async function getTag(tag) {
	return db.query(`SELECT h.id FROM hashtags h WHERE h.name=$1 LIMIT 1;`, [
		tag,
	]);
}

async function insertNewTag(tag) {
	return db.query(
		`INSERT INTO hashtags (name) VALUES ($1) RETURNING hashtags.id`,
		[tag]
	);
}

async function insertNewTagQuote({ post, tag }) {
	return db.query(
		`INSERT INTO "postsHashtags" ("postId", "hashtagId") VALUES ($1, $2)`,
		[post, tag]
	);
}

async function listHashtagPosts(hashtag) {
	return db.query(`SELECT 		
                      p."userId" AS "userId",
                      u.name,
                      u.picture,
                      p.id AS "postId",
                      p.description,
                      p.url
                    FROM posts AS p
                    JOIN users AS u ON u.id=p."userId"
                    JOIN "postsHashtags" AS ph ON ph."postId" = p.id
                    JOIN hashtags AS h ON h.id = ph."hashtagId"
					          WHERE p."deletedAt" IS NULL AND h.name = $1
                    ORDER BY p."createdAt" DESC
                    LIMIT 20;`,
		[hashtag]
	);
}

export {
	listHashtagRepository,
	getTag,
	insertNewTag,
	insertNewTagQuote,
	listHashtagPosts,
};
