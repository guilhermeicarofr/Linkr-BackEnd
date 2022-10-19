import { db } from "../database/database.js";

const getUsersRepository = async (userId) => {
    return db.query(
        `SELECT id, name, picture FROM users WHERE id = $1;`,
        [userId]
    )
};

const getUserPostsRepository = async (userId) => {
    return db.query(
        `SELECT 
            p."userId" AS "userId",
            u.name,
            u.picture,
            p.id AS "postId", 
            p.url, 
            p.description
        FROM posts AS p
        JOIN users AS u ON u.id=p."userId"
        WHERE p."userId" = $1;`,
        [userId]
    );
};

export {getUserPostsRepository, getUsers};