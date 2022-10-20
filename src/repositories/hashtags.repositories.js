import { db } from "../database/database.js";

async function listHashtagRepository () {
	return db.query(
		`SELECT h.name, COUNT(ph.id) AS quotes FROM hashtags h 
		JOIN "postsHashtags" ph ON h.id = ph."hashtagId" 
		WHERE h."deletedAt" IS NULL GROUP BY h.id ORDER BY quotes DESC LIMIT 10;;`
	);
};

export { listHashtagRepository };
