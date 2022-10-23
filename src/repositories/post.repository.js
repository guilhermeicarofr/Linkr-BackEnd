import { db } from "../database/database.js";

async function insertNewPost({ description, userId, url }) {
  return db.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1, $2, $3) RETURNING posts.id`,
    [userId, url, description]
  );
}

async function getPosts() {
  return db.query(`SELECT 
                      p."userId" AS "userId",
                      u.name,
                      u.picture,
                      p.id AS "postId",
                      p.description,
                      p.url
                    FROM posts AS p
                    JOIN users AS u ON u.id=p."userId"
					WHERE p."deletedAt" IS NULL
                    ORDER BY p."createdAt" DESC
                    LIMIT 20;`);
}


async function getPostById (postId) {	
	return db.query(
		`SELECT * FROM posts WHERE "id" = $1 AND "deletedAt" IS NULL;`,[postId]
	);
};

async function listLikes(postId) {
  return db.query(
    `SELECT u.name,u.id FROM likes l 
		JOIN users u ON l."userId" = u.id 
		WHERE "postId" = $1;`,
    [postId]
  );
}

async function getLikeByIds({ postId, userId }) {
  return db.query(
    `SELECT * FROM likes WHERE "postId" = $1 AND "userId" = $2;`,
    [postId, userId]
  );
}

async function insertLike({ postId, userId }) {
  return db.query(`INSERT INTO likes ("postId","userId") VALUES ($1,$2);`, [
    postId,
    userId,
  ]);
}

async function deleteLike({ postId, userId }) {
  return db.query(`DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2;`, [
    postId,
    userId,
  ]);
}

async function updatePost({ description, postId }) {
  return db.query(`UPDATE posts SET description =$1 WHERE id = $2;`, [
    description,
    postId,
  ]);
}


async function deletePostRepository ({postId,userId}) {
	return db.query(
		`UPDATE 
			posts AS p
		SET "deletedAt" = NOW()
		WHERE id = $1 AND "userId" = $2;`,
		[postId, userId]
	);	
}

async function deletePostsHashtagsRepository (postId) {
	return db.query(
		`DELETE FROM "postsHashtags" WHERE "postId" = $1;`,
		[postId]
	);
}

async function deletePostLikesRespository (postId) {
	return db.query(
		`DELETE FROM likes WHERE "postId" = $1;`,
		[postId]
	);
}

export { 
	insertNewPost,
	getPosts,
	getPostById, 
	listLikes, 
	getLikeByIds, 
	insertLike, 
	deleteLike, 
	deletePostRepository,
	deletePostsHashtagsRepository,
	deletePostLikesRespository,
  updatePost,
};
