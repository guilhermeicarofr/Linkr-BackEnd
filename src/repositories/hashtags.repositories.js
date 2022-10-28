import { db } from "../database/database.js";

async function listHashtags() {
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

async function deleteTagQuote({post, tag}) {
	return db.query(`
		DELETE FROM "postsHashtags" ph1 
		WHERE ph1.id IN 
			(SELECT ph2.id FROM "postsHashtags" ph2 WHERE ph2."postId" = $1 AND ph2."hashtagId"=$2 LIMIT 1)
		;`,
		[post, tag]
	);
}

async function listHashtagPosts(hashtag) {
	return db.query(`
		SELECT
			distinct (feed."createdAt"),
			feed."userId",
			feed.name,
			feed.picture,
			feed."postId",
			feed.description,
			feed.url,
			feed."shareId",
			feed."shareUserId",
			feed."shareUserName"
				
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
					WHERE p."deletedAt" IS NULL AND s."deletedAt" IS NULL
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

				JOIN "postsHashtags" ph ON ph."postId"=feed."postId"
				JOIN hashtags h ON h.id=ph."hashtagId"
				WHERE h.name = $1
				ORDER BY feed."createdAt" DESC
				LIMIT 20
				;`,
		[ hashtag ]
	);
}

export {
	listHashtags,
	getTag,
	insertNewTag,
	insertNewTagQuote,
	listHashtagPosts,
	deleteTagQuote
};
