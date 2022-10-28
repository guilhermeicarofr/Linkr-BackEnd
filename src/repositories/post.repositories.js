import { db } from "../database/database.js";
import sanitizer from "../utils/sanitizer.js"

async function insertNewPost({ description, userId, url }) {
  return db.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1, $2, $3) RETURNING posts.id`,
    [userId, url, sanitizer(description)]
  );
}

async function listPosts() {
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
      
    ORDER BY feed."createdAt" DESC
    LIMIT 20;
  `);
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


async function deletePost ({postId,userId}) {
	return db.query(
		`UPDATE 
			posts AS p
		SET "deletedAt" = NOW()
		WHERE id = $1 AND "userId" = $2;`,
		[postId, userId]
	);	
}

async function deletePostsHashtags (postId) {
	return db.query(
		`DELETE FROM "postsHashtags" WHERE "postId" = $1;`,
		[postId]
	);
}

async function deletePostLikes (postId) {
	return db.query(
		`DELETE FROM likes WHERE "postId" = $1;`,
		[postId]
	);
}

export { 
	insertNewPost,
	listPosts,
	getPostById, 
	listLikes, 
	getLikeByIds, 
	insertLike, 
	deleteLike, 
	deletePost,
	deletePostsHashtags,
	deletePostLikes,
  updatePost
};
