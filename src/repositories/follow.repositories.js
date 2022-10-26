import { db } from "../database/database.js";

async function follow({ userId, followedBy}) {
	return db.query(
		`INSERT INTO follows ("userId", "followedBy") VALUES ($1, $2);`,
		[userId, followedBy]
	);
};

async function getFollowing({userId, followedBy}) {
	return db.query(
		`SELECT * FROM follows WHERE "userId" = $1 AND "followedBy" = $2`,
		[userId, followedBy]
	);
};

async function unfollow({userId, followedBy}) {
	return db.query(
		`DELETE FROM follows WHERE "userId" = $1 AND "followedBy" = $2`,
		[userId, followedBy]
	);
};



export { follow, getFollowing, unfollow };
